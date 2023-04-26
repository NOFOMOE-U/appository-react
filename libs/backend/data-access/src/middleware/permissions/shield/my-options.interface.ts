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
    // cache: {}, removed from mycontex
    // token: '', removed from mycontex
    // user: '',// causese an error if removed but should be removed due to being in mycontext
    // session: {}, removed from mycontex
    cookies: { key: ''},
    // get: () => '',// tied to mycontext.ts
    id: '',// removing from myContext causs
    userId: 0,

    request: {
      id: '',
      user: { id: '' } as UserWithoutSensitiveData,
      body: {},
      headers: {} as Headers,
      prisma: new PrismaClient(),
      currentUser:  null,
      accessToken:  null,
      context: {} as MyContext,
      ...{} as any
    },
    prisma: new PrismaClient(),
  },
};

export default options
