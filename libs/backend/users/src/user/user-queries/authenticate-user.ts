import { User } from '@prisma/client';
import { verifyPassword } from '../../../interfaces/auth/user-with-password-hash';
import prisma from '../../../lib/prisma/prisma';
import { userSelect } from '../user-select';

type UserWithoutPassword = Omit<User, 'passwordHash'>;

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