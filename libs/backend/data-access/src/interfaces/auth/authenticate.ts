import { ExtendedCustomRequest } from '@appository/backend/data-access'
import { PrismaClient, User, UserRole } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { URLSearchParams } from 'url'
import { AppConfiguration } from '../../context/app-configuration'
import { CustomContextType } from '../../context/custom-context-type'
import { CustomURLSearchParams, MyContext } from '../../context/my-context'
import { CustomSessionType } from '../../make-api/my-custom-request'
import { BodyContent, CustomRequestInit } from '../../make-api/requests/custom-request-init'
import { CustomRequestWithContext, YourRequestObject } from '../../make-api/requests/custom-request-with-context'
import { UserWithAccessToken, UserWithoutSensitiveData } from '../../modules/user/user'
import generateToken from '../../utils/generate-token.utils'
import { generateRandomHash } from './generate-random-hash'
import { removeSensitiveData } from './remove-sensitive-data'
import { UserWithPasswordHash } from './user-with-password-hash'

export type SessionRequestContext = CustomRequestWithContext<MyContext<CustomSessionType>>['req'] &
  ExtendedCustomRequest<MyContext<CustomSessionType>>
// Before calling any of these functions, ensure that context contains prisma
const contextWithPrisma = createContextWithPrisma()

export function convertUserToUserWithAccessToken(user: User): UserWithAccessToken {
  return {
    ...user,
    resetPasswordToken: undefined,
    accessToken: generateToken(user),
    userProfileId: user.id as unknown as number,
    passwordHash: undefined, // Change the type to undefined
    username: user.username, // Add username property
  }
}

export const initalizeUser = (): User => ({
  id: '1',
  name: 'tom',
  username: 'theOne',
  email: 'test@example.com',
  roles: [UserRole.USER],
  createdAt: new Date(),
  updatedAt: new Date(),
  userProfileId: 98098087,
  passwordHash: generateRandomHash(), // Replace with an actual hashed password
  resetPasswordToken: `undefined`, // Replace with an actual reset token or use undefined
})

const user: User = initalizeUser()
async function createContextWithPrisma(): Promise<PrismaClient> {
  const prisma = new PrismaClient()
  let context: MyContext = {
    prisma,
    body: {} as BodyInit | null,
    requestBody: {} as BodyContent | null | undefined,
    user: convertUserToUserWithAccessToken(user),
    currentUser: {} as UserWithoutSensitiveData,
    config: {} as AppConfiguration,
    accessToken: null,
    session: {} as CustomSessionType,
    ctx: {} as CustomContextType<MyContext<{}>>,
    URLSearchParams: {} as CustomURLSearchParams,
    signedCookies: {},
    request: {} as YourRequestObject<CustomRequestInit>,
    size: 0, // Changed {} to 0 to fix the error
    url: '',
    context: {
      currentUser: {} as UserWithAccessToken,
      accessToken: undefined,
      url: {} as URLSearchParams,

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
    append: (key: string, value: string) => void {},
    get: () => '',
    accepts: (types: string | string[]) => [],
    entries(): IterableIterator<[string, string]> {
      const data = [['key1', 'value1']]
      let index = 0

      return {
        [Symbol.iterator]() {
          return this
        },
        next() {
          if (index < data.length) {
            const value = data[index]
            index++
            return { done: false, value: value as [string, string] }
          } else {
            return { done: true, value: undefined }
          }
        },
      }
    },
    forEach: (callback: (key: string, value: string, parent?: CustomURLSearchParams) => void) => {
      // Implement the 'forEach' method logic here
      for (const key in context) {
        if (context.hasOwnProperty(key)) {
          callback(key, context[key] as string);
        }
      }
    },
    delete: (key: string) => {
      // Implement the 'delete' method logic here
      if (context.hasOwnProperty(key)) {
        delete context[key];
      }
    },
    getAll: (name: string[]) => {
      // Implement the 'getAll' method logic here
      const values: string[] = [];
      for (const name of names) {
        if (context[name] !== undefined) {
          values.push(context[name] as string);
        }
      }
      return values;
    },
    
    
    keys: ():IterableIterator<string> => {
      const data = ['key1', 'key2']
      let index = 0

      return {
        [Symbol.iterator]() {
          return this
        },
        next() {
          if (index < data.length) {
            const value = data[index]
            index++
            return { done: false, value: value }
          } else {
            return { done: true, value: undefined }
          }
        },
      }
    },
    values: (): IterableIterator<string> => {
      const data = ['value1', 'value2']
      let index = 0

      return {
        [Symbol.iterator]() {
          return this
        },
        next() {
          if (index < data.length) {
            const value = data[index]
            index++
            return { done: false, value: value }
          } else {
            return { done: true, value: undefined }
          }
        },
      }
    },
    has: (): boolean => {
      return true
    },
    // Add the 'has' method
    set: (key: string, value: string) => {
      // Implement the 'set' method logic here
      context[key] = value
    },
    // Add the 'set' method
    sort: () => {
      // Implement the 'sort' method logic here
      const sortedContext = {...context}

      Object.keys(sortedContext)
        .sort()
        .forEach((key) => {
          sortedContext[key] = context[key]
        })

      return sortedContext
    },
    [Symbol.iterator](): IterableIterator<[string, string]> {
      return this.entries()
    }
  }

  context.accessToken = ''
  context.currentUser = {} as UserWithAccessToken
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

  if (user.passwordHash !== null) {
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
