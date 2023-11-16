import { IncomingMessage } from 'http'
import { ParsedQs } from 'qs'
import { AppConfiguration } from '../../context/app-configuration'
import { CustomContextType } from '../../context/custom-context-type'
import { CustomURLSearchParams } from '../../context/my-context'
import { PrismaService } from '../../lib/prisma/prisma.service'
import { UserWithoutSensitiveData } from '../../modules/user/user'
import { UserService } from '../../modules/user/user.service'
import { AccessTier } from '../api-config/access-tier'
import { CustomSessionType } from '../my-custom-request'
import { YourRequestObject } from './custom-request-with-context'
export type BodyContent = object | FormData | string // Include all possible types

export interface CustomRequestInit extends RequestInit {
  //todo do i need accessTier here 
  user: UserWithoutSensitiveData
  url?: string
  query?: ParsedQs
  accessTier?: AccessTier
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

const accessTier = {} as string; // initialize accessTier

const prismaService = new PrismaService();
const userService = new UserService(prismaService, accessTier
 //todo verify if it needs to be here and then update
);
export interface CustomRequestOptions extends CustomRequestInit {
  userService: UserService
  accessTier: AccessTier
 }

const customRequestOptions: CustomRequestOptions = {
  userService: userService,
  user: {} as UserWithoutSensitiveData,
  accessTier: {} as AccessTier, // todo AccessTier
  accepts: () => ['json'],
  body: {} as BodyInit | null | undefined,
  request: {} as YourRequestObject<CustomRequestInit>,
  requestBody: {} as BodyContent | null | undefined,
  URLSearchParams: {} as CustomURLSearchParams,
}

export interface CustomRequestInitWithGet extends CustomRequestInit {
  get?: (name: string) => string | null | undefined
}
