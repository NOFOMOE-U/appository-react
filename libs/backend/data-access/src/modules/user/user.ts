import { Prisma, PrismaClient, User } from '@prisma/client';
import { hashPassword, verifyPassword } from '../../interfaces/auth/user-with-password-hash';
const prisma = new PrismaClient();




export interface UserWithoutSensitiveData extends Omit<User, 'passwordHash' | 'resetPasswordToken'> {
  password?: string;
  passwordHash?: never;
}

interface UserCreateInputWithPassword extends Omit<Prisma.UserCreateInput, 'password'> {
  password: string;
}

type UserWithoutPassword = Omit<User, 'passwordHash'>;


const userSelect = {
  id: true,
  name: true,
  email: true,
  roles: true,
  userProfileId: true,
  createdAt: true,
  updatedAt: true,
};








export const getAllUsers = async (): Promise<UserWithoutSensitiveData[]> => {
  const users = await prisma.user.findMany({
    select: {
      ...userSelect,
      passwordHash: false,
      resetPasswordToken: false,
    },
  });

  return users.map((user) => ({ ...user }));
};






export const getUserById = async (
  userId: string
): Promise<UserWithoutSensitiveData | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      ...userSelect,
      passwordHash: false,
      resetPasswordToken: false,
    },
  });

  if (!user) {
    return null;
  }

  return { ...user };
};









export const createUser = async (
  data: UserCreateInputWithPassword
): Promise<UserWithoutSensitiveData> => {
  const { password, ...userData } = data;
  const hashedPassword = await hashPassword(password);

  const createdUser = await prisma.user.create({
    data: {
      ...userData,
      passwordHash: hashedPassword,
    },
    select: {
      ...userSelect,
      passwordHash: false,
      resetPasswordToken: false,
    },
  });

  return { ...createdUser };
};









export const updateUser = async (
  id: string,
  data: Prisma.UserCreateInput
): Promise<UserWithoutSensitiveData | null> => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      ...data,
      passwordHash: undefined
    },
    select: {
      ...userSelect,
      passwordHash: false,
      resetPasswordToken: false,
    },
  });

  if (!user) {
    return null;
  }

  return { ...user };
};









export const deleteUser = async (
  id: string
): Promise<UserWithoutSensitiveData | null> => {
  const user = await prisma.user.delete({
    where: { id },
    select: {
      ...userSelect,
      passwordHash: false,
      resetPasswordToken: true,
    },
  });

  if (!user) {
    return null;
  }

  return { ...user };
};







export const getUserByEmail = async (
  email: string
): Promise<UserWithoutSensitiveData | null> => {
  const userWithSensitiveData = await prisma.user.findUnique({
    where: { email },
    select: {
      ...userSelect,
      passwordHash: true,
      resetPasswordToken: false,
    },
  });

  if (!userWithSensitiveData) {
    return null;
  }

  const {passwordHash, ...userWithoutSensitiveData} = userWithSensitiveData
  return userWithoutSensitiveData;
};










export const authenticate = async (
  email: string,
  password: string
): Promise<UserWithoutPassword | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      ...userSelect,
      passwordHash: true,
      resetPasswordToken: true,
    },
  });

  if (!user) {
    return null;
  }

  const isPasswordValid = password && user.passwordHash && await verifyPassword(password, user.passwordHash)

  if (!isPasswordValid) {
    return null
  }

  const { passwordHash, resetPasswordToken, ...userWithoutPassword } = user;

  return userWithoutPassword as UserWithoutPassword;
};
