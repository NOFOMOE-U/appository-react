import { PrismaClient, User, UserRole } from '@prisma/client'
import { IOptions, ShieldRule } from 'graphql-shield/typings/types'
import { MyContext } from '../../../context/my-context'
import { axiosRequest } from '../../../make-api/axios-request'
import { CustomSessionType } from '../../../make-api/my-custom-request'
import { UserWithoutSensitiveData } from '../../../modules/user/user'
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



const prisma = new PrismaClient();

const options: MyOptions= {
  debug: true,
  context: {
    session: {} as CustomSessionType,
    cookies: { key: '' },
    userId: '',
    get: (name: string) => undefined,
    context: {},
    body: {},
    cache: {},
    accessToken: '',
    credentials: '',
    request: {
      id: '',
      user: { id: '' } as UserWithoutSensitiveData,
      body: {},
      // #todo verify axiosRequest is accurately being used
      headers: axiosRequest,
      prisma: new PrismaClient(),
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
    prisma: new PrismaClient(),
  },
  allowExternalErrors: false,
  fallbackRule: {} as ShieldRule,
  hashFunction: function (arg: { parent: any; args: any }): string {
    throw new Error('Function not implemented.')
  }
}

export default options
