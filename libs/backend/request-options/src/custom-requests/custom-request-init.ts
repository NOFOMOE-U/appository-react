
import { AppConfiguration, CustomContextType, CustomURLSearchParams } from '@appository/backend/context-system'
import { PrismaService, User } from '@appository/backend/data-access'
import { UserService, UserWithoutSensitiveData } from '@appository/backend/users'
import { IncomingMessage } from 'http'
//todo move into a shared file
import { AccessLevel } from 'libs/backend/data-access/src/interfaces/auth/access-level'
import { ParsedQs } from 'qs'
import { YourRequestObject } from './custom-request-with-context'
import { CustomSessionType } from './my-custom-request'


export type BodyContent = object | FormData | string // Include all possible types

export interface CustomRequestInit extends RequestInit {
  //todo do i need accessLevel here 
  user: UserWithoutSensitiveData
  url?: string
  query?: ParsedQs
  accessLevel?: AccessLevel
  params?: { [key: string]: string }
  get?: (name: string) => string | null | undefined
  accepts: (types: string | string[] | undefined) => (string | false | null)[] | undefined
  customCache?: RequestCache
  session?: CustomSessionType
  ///used for making HTTP Request to adhere to RequestInit
  body: BodyInit | null | undefined
  // used to set and managing request body content
  requestBody: BodyContent | null | undefined
  signedCookies?: { [key: string]: string }
  context?: CustomContextType
  config?: AppConfiguration
  URLSearchParams: CustomURLSearchParams
  request: YourRequestObject<CustomRequestInit>
  req?: IncomingMessage
}

let accessLevel: Promise<User> // initialize accessLevel

const prismaService = new PrismaService();
const userService = new UserService(prismaService, accessLevel)

 //todo verify if it needs to be here and then update;
export interface CustomRequestOptions extends CustomRequestInit {
  userService: UserService
  accessLevel?: AccessLevel
  currentUser?: UserWithoutSensitiveData
 }

const customRequestOptions: CustomRequestOptions = {
  userService: userService,
  user: {} as UserWithoutSensitiveData,
  accessLevel: {} as AccessLevel, // todo AccessLevel
  accepts: () => ['json'],
  body: {} as BodyInit | null | undefined,
  request: {} as YourRequestObject<CustomRequestInit>,
  requestBody: {} as BodyContent | null | undefined,
  URLSearchParams: {} as CustomURLSearchParams,
}

export interface CustomRequestInitWithGet extends CustomRequestInit {
  get?: (name: string) => string | null | undefined
}
