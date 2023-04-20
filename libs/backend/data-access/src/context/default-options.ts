import { PrismaClient, User } from '@prisma/client'
import { IOptions } from 'graphql-shield/typings/types'
import { ExtendedCustomRequest } from '../interfaces/user/custom-request'
import { mergeContext } from '../utils/merge-options.utils'
import { ContextType } from './context-type'
import { CustomRequestWithContext, attachCustomContext } from './custom-request-with-context'
import { MyContext } from './mycontext'

const user: User | null = null // Define user here

interface DefaultOptions extends IOptions<MyContext> {
  debug?: boolean
  attachCustomContext?: () => void
}

type MyOptions = DefaultOptions &
  ContextType & {
    debug?: boolean
    attachCustomContext?: () => void
    context?: MyContext<{}>
  }

const mockRequest: ExtendedCustomRequest = {
    context: {},
    user: { id: '' },
    id: '',
    userId: '',
    currentUser: null,
    accessToken: '',
    prisma: new PrismaClient(),
} as CustomRequestWithContext

export const defaultContext: MyContext<{}> = {
  id: '',
  userId: '',
  currentUser: null,
  accessToken: '',
  token: '',
  request: mockRequest,
  prisma: new PrismaClient(),
}

const customContext = {
  userId: 'user_id',
  currentUser: null,
}

const customOptions: MyOptions = {
  debug: true,
  context: mergeContext(defaultContext, customContext),
  attachCustomContext: attachCustomContext,
  id: '',
  prisma: new PrismaClient(),
  userId: '',
  currentUser: user,
  accessToken: '',
}

const options: MyOptions = {
  ...customOptions,
  context: {
    ...defaultContext,
    ...customOptions.context,
  },
}

export default options
