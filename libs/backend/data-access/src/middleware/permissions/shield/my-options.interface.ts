import { PrismaClient, User, UserRole } from '@prisma/client'
import { IOptions } from 'graphql-shield/typings/types'
import { MyContext } from '../../../context/mycontext'
import { CustomRequest } from '../../../interfaces/user/custom-request'

export interface MyOptions extends IOptions {
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
    /* your context object here */
    id: '',
    userId: '1',
    currentUser: user,
    accessToken: '',
    token: '',
    request: {
      id: '',
      user: { id: '' },
      body: {},
      headers: {},
      prisma: new PrismaClient(),
      currentUser: null,
      accessToken: null,
      context: {},
    } as CustomRequest<{}>,

    prisma: new PrismaClient(),
  },
}

export default MyOptions
