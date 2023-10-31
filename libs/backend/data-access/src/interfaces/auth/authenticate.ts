import { ExtendedCustomRequest } from '@appository/backend/data-access'
import { PrismaClient, User, UserRole } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { AppConfiguration } from '../../context/app-configuration'
import { CustomContextType } from '../../context/custom-context-type'
import { MyContext, UserWithAccessToken } from '../../context/my-context'
import { CustomSessionType } from '../../make-api/my-custom-request'
import { CustomRequestWithContext } from '../../make-api/requests/custom-request-with-context'
import { UserWithoutSensitiveData } from '../../modules/user/user'
import { SessionData } from '../../types/express'
import generateToken from '../../utils/generate-token.utils'
import { removeSensitiveData } from './remove-sensitive-data'
import { UserWithPasswordHash } from './user-with-password-hash'


export type SessionRequestContext = CustomRequestWithContext<MyContext<CustomSessionType>>['req'] & ExtendedCustomRequest<MyContext<CustomSessionType>>
// Before calling any of these functions, ensure that context contains prisma
const contextWithPrisma = createContextWithPrisma()



export function convertUserToUserWithAccessToken(user: User): UserWithAccessToken {
  return {
    ...user,
    resetPasswordToken: '',
    accessToken: generateToken(user),
    userProfileId: user.id as unknown as number,
    passwordHash: undefined, // Change the type to undefined
  };
}

export const initalizeUser = (): User =>({
  id: '1',
  name: 'tom',
  email: 'test@example.com',
  roles: [UserRole.USER],
  createdAt: new Date(),
  updatedAt: new Date(),
  passwordHash: `undefined`, // Replace with an actual hashed password
  resetPasswordToken: `undefined`, // Replace with an actual reset token or use undefined
})

const user: User = initalizeUser()
function createContextWithPrisma(): PrismaClient {
  const prisma = new PrismaClient()
  const context: MyContext = {
    prisma,
    ctx: prisma,
    currentUser: null,
    config: {} as AppConfiguration,
    accessToken: undefined,
    session: {} as CustomSessionType,
    signedCookies: {},
    context: {
      currentUser: {} as UserWithAccessToken,
      accessToken: undefined,
      context: {
        accessToken: '',
        currentUser: {} as UserWithoutSensitiveData,
        accepts: (types: string | string[]) => [],
        signedCookies: {},
        session: SessionData,
        get: (name: string) => '',
        config: {} as AppConfiguration,
        context: {} as MyContext<{}>,
        ctx: {} as CustomContextType<MyContext<{}>>,
        req: {} as SessionRequestContext
      },
      ctx: {} as CustomContextType<MyContext<{}>>,
      config: {
        enableVideo: false,
        enableAudio: false,
        defaultUserRole: 'USER',
        userRoles: [],
        allowRegistration: true,
        requireEmailVerification: false,
        allowPublicRooms: false,
        allowPrivateRooms: false,
        enableModeration: false,
        moderatorRoles: [],
        allowFileUploads: true,
        maxFileSize: 0,
        enableNotifications: false,
        //restrict access based on location
        restrictAccessByLocation: false,
        allowedLocations: [],
      },
      session: {
        userId: '',
        username: '',
        expires: 15,
      } as CustomSessionType,
      accepts: function (types: string | string[]): string[] {
        throw new Error('Function not implemented.')
      },
      signedCookies: {} as Record<string, string>,
      get: function (name: string): string | undefined {
        throw new Error('Function not implemented.')
      },
    },
    get: () => '',
    accepts: (types: string | string[]) => [],
  }
  context.context.accessToken = ''
  context.user = prisma.user
  return prisma
}

export const createUser = async (
  prisma: PrismaClient,
  context: MyContext,
  userWithPasswordHash: UserWithPasswordHash,
  roles: UserRole[] = ['USER'],
): Promise<UserWithoutSensitiveData> => {
  const allowedRoles = Object.values(UserRole)
  const validRoles = roles.filter((role) => allowedRoles.includes(role))

  const { name, email, passwordHash, id } = userWithPasswordHash

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      roles: {
        set: validRoles,
      },
    },
  })

  if (!user) {
    throw new Error('Failed to create the user, try again')
  }

  // Generate a JWT token for the newly created user
  const token = generateToken(user)
  // Add the JWT token to the context object
  context.token = token

  const userWithoutSensitiveData = removeSensitiveData(user)
  return userWithoutSensitiveData
}

export const updateUser = async (
  prisma: PrismaClient,
  context: MyContext,
  id: string,
  name: string,
  email: string,
  roles: UserRole[],
): Promise<UserWithoutSensitiveData | null> => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      roles,
    },
  })
  return user as unknown as UserWithoutSensitiveData | null
}

export const deleteUser = async (
  prisma: PrismaClient,
  context: MyContext,
  id: string,
): Promise<UserWithoutSensitiveData | null> => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  })
  return user as unknown as UserWithoutSensitiveData | null
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

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      roles,
    },
  })

  // Remove sensitive fields from the user object before returning
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

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordHash: hashedNewPassword,
    },
  })

  // Remove sensitive fields from the user object before returning
  const userWithoutSensitiveData = removeSensitiveData(updatedUser)
  // Generate a new JWT token for the updated user
  const token = generateToken(updatedUser)
  // Add the JWT token to the context object
  context.token = token
  return userWithoutSensitiveData
}
