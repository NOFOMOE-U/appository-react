//4. create a request when a client makes a request to the server
import { Request } from 'express'
import { Session } from 'express-session'
import { AppConfiguration } from '../../context/app-configuration'
import { CustomRequestCommon } from '../../context/custom-common-request'
import { CustomSessionType } from '../../make-api/my-custom-request'
import { BodyContent } from '../../make-api/requests/custom-request-init'
import { CustomContextHeaders } from '../../make-api/requests/custom-request-with-context'
import { UserWithoutSensitiveData } from '../../modules/user/user'
import { UserService } from '../../modules/user/user.service'
// const prisma = new PrismaClient()

export declare const jest: {
  fn: Function
}


//using the generate Type parameter of T allows us to be able to add
// additional properities to the reqquest object as needed.
export interface CustomRequest<T = unknown> extends Request {
  context: T
  id: string
  config: AppConfiguration
  user?: UserWithoutSensitiveData | null
  userId?: string
  query: any;
  params: any;
  token: string
  expires: string
  username: string 
  startTime?: number
  cache: RequestCache
  request: CustomRequest
  requestBody: BodyContent | null | undefined
  currentUser?: UserWithoutSensitiveData | undefined | null
  destination: RequestDestination
  body: BodyInit | null | undefined
  headers: CustomContextHeaders
  accessToken?: string | null
  yourSessionKey: string
  userService: UserService
}

// Define the ExtendedCustomRequest interface that extends CustomRequest with additional properties
export interface ExtendedCustomRequest<T extends {} = {}> extends CustomRequestCommon, CustomRequest<T> {
  context: T
  // credentials?: string
  // destination?: string
  session: CustomSessionType & Session
  integrity?: string
  accessToken: string
  cache: RequestCache
  
  headers: CustomContextHeaders & {authorization?: string}
  get(name: string): string | undefined
  get(name: string | string[]): string[] | undefined
  get(name: 'set-cookie' | string): string | string | undefined
  getAll(name: string): string[] | undefined
  cookies: Record<string, string>
  signedCookies: Record<string, string>
}

export const getHeaderValue = (
  headers: CustomContextHeaders,
  name: 'set-cookie' | string,
): string | string[] | undefined => {
  const headerValue = headers[name]
  if (headerValue === undefined) {
    return undefined
  }
  if (name === 'set-cookie') {
    return Array.isArray(headerValue) ? headerValue : [headerValue]
  } else {
    return typeof headerValue === 'string' ? [headerValue] : headerValue
  }
}

