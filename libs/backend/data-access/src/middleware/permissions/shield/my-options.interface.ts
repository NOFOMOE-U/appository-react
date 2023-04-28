import { PrismaClient, User, UserRole } from '@prisma/client'
import { IOptions } from 'graphql-shield/typings/types'
import { CustomRequestWithContext } from '../../../context/custom-request-with-context'
import { MyContext } from '../../../context/mycontext'
import { UserWithoutSensitiveData } from '../../../modules/user/user'
export interface MyOptions extends IOptions<MyContext> {
  //override the debug property to accept a string instead of a boolean
  debug?: boolean
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

const options: MyOptions = {
  debug: true,
  context: {
    req: {} as CustomRequestWithContext<MyContext>,
    token: '', //removed from mycontex
    session: {},  //removed from mycontex
    cookies: { key: '' },
    userId: parseInt('0'),

    body: {},
    cache: {},
    accessToken: '',
    credentials:'',
    request: {
      id: '',
      user: { id: '' } as UserWithoutSensitiveData,
      body: {},
      // todo figure out if I need headers here
      // headers: {
      //   [key: string]: string | string[] | undefined,
      //   authorization?: string
      // },
      prisma: new PrismaClient(),
      currentUser: null,
      accessToken: null,
      context: {} as MyContext,
      ...({} as any),
    },
    prisma: new PrismaClient(),
  },
}

export default options
