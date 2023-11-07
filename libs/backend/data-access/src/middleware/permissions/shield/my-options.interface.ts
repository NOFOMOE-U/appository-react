import { UserService, UserWithAccessToken, UserWithoutSensitiveData } from '@appository/backend/data-access'
import { PrismaClient, User, UserRole } from '@prisma/client'
import { IOptions, ShieldRule } from 'graphql-shield/typings/types'
import { AppConfiguration } from '../../../context/app-configuration'
import { CustomContextType } from '../../../context/custom-context-type'
import { CustomURLSearchParams, MyContext } from '../../../context/my-context'
import { hashPassword } from '../../../interfaces/auth/user-with-password-hash'
import prisma from '../../../lib/prisma/prisma'
import { axiosRequest } from '../../../make-api/axios-request'
import { CustomSessionType } from '../../../make-api/my-custom-request'
import { BodyContent } from '../../../make-api/requests/custom-request-init'
import errorMessages from '../error-messages'
export interface MyOptions extends IOptions{
  //override the debug property to accept a string instead of a boolean
  debug: boolean
  //add a new property that specifies the type of context expected by the middleware
  context: MyContext
  prisma?: PrismaClient
}

const currentUserRequestsPasswordHash = true; // Replace with your logic to determine if passwordHash should be included
let user: User

user = {
  id: '1',
  name: 'tom',
  email: 'test@example.com',
  roles: [UserRole.USER],
  username: 'WhoAmI',
  userProfileId: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  passwordHash: `undefined`,
  resetPasswordToken: null,
  // add any additional fields as necessary
}
const mockDataEntries: Record<string, string> = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
};

const options: MyOptions= {
  debug: true,
  context: {
    currentUser: {} as UserWithAccessToken | null,
    config: {} as AppConfiguration,
    session: {} as CustomSessionType,
    cookies: { key: 'cookies-value' },
    userId: 'user-id',
    get: (name: string) => undefined,
    userService: {} as UserService,
    context: {} as MyContext<{}>,
    ctx: {} as CustomContextType<MyContext<{}>>,
    body: {} as BodyInit | null,
    requestBody: {} as BodyContent | null | undefined,
    cache: {} as RequestCache,
    accessToken: '',
    request: {
      id: 'user-id',
      user: { id: 'user-id' } as UserWithoutSensitiveData,
      body: {},
      // #todo verify axiosRequest is accurately being used
      headers: axiosRequest,
      prisma: prisma,
      currentUser: null,
      accessToken: null,
      context: {} as MyContext,
      ...({} as any),
    },
    accepts: (types: string | string[] | undefined) => {
      if (typeof types === 'string' && types == 'application/json') {
        return ['application/json']
      }
      return []
    },
    signedCookies: {},
    prisma: prisma,
    user: {} as UserWithAccessToken,
    url: '',
    size: 0,
    entries: (): IterableIterator<[string, string]> => Object.entries(mockDataEntries)[Symbol.iterator](),
    keys: (): IterableIterator<string> => Object.keys(mockDataEntries)[Symbol.iterator](),
    values: (): IterableIterator<string> => Object.values(mockDataEntries)[Symbol.iterator](),
    append: (key: string, value: string) => [],
    has: (key: string) => true,
    set: (key: string, value: string) => {},
    sort: () =>  {},
    forEach(callback: (value: string, name: string, searchParams: CustomURLSearchParams) => void): void{
      Object.entries(mockDataEntries).forEach(([name, value]) => {
        callback(value, name, this.URLSearchParams)
      })
    },
    delete: (name: string) => {
      try {
        // Check if the entry exists in mockDataEntries
        if (mockDataEntries.hasOwnProperty(name)) {
          // If it exists, delete the entry by the specified name
          delete mockDataEntries[name];
        } else {
          // Entry not found, handle the error
          throw new Error(`Entry with name "${name}" not found.`);
        }
      } catch (error) {
        // Handle the error, you can log it or throw a custom error
        console.error(`Error deleting entry: ${errorMessages.ENTRY_NOT_FOUND}`, error);
      }
    },
    getAll: (names: string[]): string[] => {
      return names.map(name => {
        return mockDataEntries[name]
      }
    )},
    URLSearchParams: {} as CustomURLSearchParams,
    [Symbol.iterator]: () => Object.entries(mockDataEntries)[Symbol.iterator]()
  },
  allowExternalErrors: false,
  fallbackRule: {} as ShieldRule,
  hashFunction: async (arg: { parent: any, args: any, context: MyContext }): Promise<string> => {
    const dataToHash = `${arg.parent} - ${arg.args.date} - ${arg.context}`
    const hashedPassword = await hashPassword(dataToHash);
    return hashedPassword
  }
}

export default options
