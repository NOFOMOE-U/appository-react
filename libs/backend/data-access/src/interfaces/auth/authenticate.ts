import { PrismaClient, UserRole } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { MyContext } from '../../context/my-context'
import { UserWithoutSensitiveData } from '../../modules/user/user'
import generateToken from '../../utils/generate-token.utils'
import { removeSensitiveData } from './remove-sensitive-data'
import { UserWithPasswordHash } from './user-with-password-hash'


//create userr recode 
export const createUser = async (
  context: MyContext,
  userWithPasswordHash: UserWithPasswordHash,
  roles: UserRole[] = ['USER'],
): Promise<UserWithoutSensitiveData> => {
  const allowedRoles = Object.values(UserRole)
  const validRoles = roles.filter((role) => allowedRoles.includes(role))

  const { name, email, passwordHash, } = userWithPasswordHash
  
  const user = await context.prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      roles: {
        set: validRoles,
      },
    },
  })
  // Generate a JWT token for the newly created user
  const token = generateToken(user)
  // Add the JWT token to the context object
  context.token = token

  const userWithoutSensitiveData = removeSensitiveData(user)
  return userWithoutSensitiveData
}

export const updateUser = async (
  context: MyContext,
  id: string,
  name: string,
  email: string,
  roles: UserRole[],
): Promise<UserWithoutSensitiveData | null> => {
  const user = await context.prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      roles,
    },
  })
  return user
}

export const deleteUser = async (context: MyContext, id: string): Promise<UserWithoutSensitiveData | null> => {
  const user = await context.prisma.user.delete({
    where: {
      id,
    },
  })
  return user
}

export async function authenticate(
  context: MyContext,
  email: string,
  password: string,
  prisma: PrismaClient,
): Promise<UserWithoutSensitiveData | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  })
  if (!user) {
    return null
  }

  const isPasswordCorrect = await compare(password, user.passwordHash)

  if (isPasswordCorrect) {
    // Remove sensitive fields from the user object before returning

    const userWithoutSensitiveData = removeSensitiveData(user)
    // Generate a JWT token for the authenticated user
    const token = generateToken(user)
    // Add the JWT token to the context object
    context.token = token
    return userWithoutSensitiveData
  }

  return null
}

export async function authenticateAndUpdateRoles(
  context: MyContext,
  email: string,
  password: string,
  roles: UserRole[],
  prisma: PrismaClient,
): Promise<UserWithoutSensitiveData | null> {
  const user = await authenticate(context, email, password, prisma)
  if (!user) {
    return null
  }

  const updatedUser = await context.prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      roles,
    },
  })

  // Remove sensitive fields from the user robject before returning

  const userWithoutSensitiveData = removeSensitiveData(updatedUser)
  return userWithoutSensitiveData
}

export async function authenticateAndUpdatePassword(
  context: MyContext,
  email: string,
  password: string,
  newPassword: string,
  prisma: PrismaClient,
): Promise<UserWithoutSensitiveData | null> {
  const user = await authenticate(context, email, password, prisma)
  if (!user) {
    return null
  }

  const hashedNewPassword = await hash(newPassword, 10)

  const updatedUser = await context.prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordHash: hashedNewPassword,
    },
  })

  //Remoove sensitive fields from the user object before returning
  const userWithoutSensitiveData = removeSensitiveData(updatedUser)
  // Generate a new JWT token for the updated user
  const token = generateToken(updatedUser)
  // Add the JWT token to the context object
  context.token = token
  return updatedUser
}
