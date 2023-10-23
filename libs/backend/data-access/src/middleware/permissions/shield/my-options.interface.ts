import { UserWithoutSensitiveData } from '@appository/backend/data-access'
import { PrismaClient, User, UserRole } from '@prisma/client'
import { IOptions, ShieldRule } from 'graphql-shield/typings/types'
import { AppConfiguration } from '../../../context/app-configuration'
import { MyContext, UserWithAccessToken } from '../../../context/my-context'
import { hashPassword } from '../../../interfaces/auth/user-with-password-hash'
import prisma from '../../../lib/prisma/prisma'
import { axiosRequest } from '../../../make-api/axios-request'
import { CustomSessionType } from '../../../make-api/my-custom-request'
export interface MyOptions extends IOptions{
  //override the debug property to accept a string instead of a boolean
  debug: boolean
  //add a new property that specifies the type of context expected by the middleware
  context: MyContext
  prisma?: PrismaClient
}

const user: User = {
  id: '1',
  name: 'tom',
  email: 'test@example.com',
  roles: [UserRole.USER],
  userProfileId: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  passwordHash: '',
  resetPasswordToken: '',
  // add any additional fields as necessary
}

const options: MyOptions= {
  debug: true,
  context: {
    currentUser: {} as UserWithAccessToken | null,
    config: {} as AppConfiguration,
    session: {} as CustomSessionType,
    cookies: { key: '' },
    userId: '',
    get: (name: string) => undefined,
    context: {} as MyContext<{}>,
    ctx: {} as MyContext,
    body: {},
    cache: {} as RequestCache,
    accessToken: '',
     request: {
      id: '',
      user: { id: '' } as UserWithoutSensitiveData,
      body: {},
      // #todo verify axiosRequest is accurately being used
      headers: axiosRequest,
      prisma: prisma,
      currentUser: null,
      accessToken: null,
      context: {} as MyContext,
      ...({} as any),
    },
    accepts: (types: string | string[]) => {
      if (typeof types === 'string' && types == 'application/json') {
        return ['application/json']
      }
      return []
    },
    signedCookies: {},
    prisma: prisma,
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
