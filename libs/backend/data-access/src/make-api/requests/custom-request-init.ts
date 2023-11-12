import { IncomingMessage } from 'http'
import { ParsedQs } from 'qs'
import { AppConfiguration } from '../../context/app-configuration'
import { CustomContextType } from '../../context/custom-context-type'
import { CustomURLSearchParams } from '../../context/my-context'
import { PrismaService } from '../../lib/prisma/prisma.service'
import { UserWithAccessToken } from '../../modules/user/user'
import { UserService } from '../../modules/user/user.service'
import { AccessTier } from '../api-config/access-tier'
import { CustomSessionType } from '../my-custom-request'
import { YourRequestObject } from './custom-request-with-context'
export type BodyContent = object | FormData | string // Include all possible types

export interface CustomRequestInit extends RequestInit {
  user: UserWithAccessToken | null
  url?: string
  query?: ParsedQs
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

const userAccessTier = {} as AccessTier
//todo verify accessTier goes here - checked updated 
// const accessTier =  mapAccessTierToUserWithAccessToken('userAccessTier');
const prismaService = new PrismaService();
const userService = new UserService(prismaService, userAccessTier);
export interface CustomRequestOptions extends CustomRequestInit {
  userService: UserService
  // accessTier: AccessTier
 }

const customRequestOptions: CustomRequestOptions = {
  userService: userService,
  user: null,
  // accessTier: {} as AccessTier, // todo AccessTier
  accepts: () => ['json'],
  body: {} as BodyInit | null | undefined,
  request: {} as YourRequestObject<CustomRequestInit>,
  requestBody: {} as BodyContent | null | undefined,
  URLSearchParams: {} as CustomURLSearchParams,
}

export interface CustomRequestInitWithGet extends CustomRequestInit {
  get?: (name: string) => string | null | undefined
}
