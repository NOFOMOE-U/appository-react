//4. create a request when a client makes a request to the server
import { Request } from 'express-serve-static-core'

import { AppConfiguration, CustomRequestCommon } from '@appository/backend/context-system'
import { UserService, UserWithoutSensitiveData } from '@appository/backend/users'
import { Session } from 'libs/backend/users/src/types/express'
import { BodyContent } from './custom-request-init'
import { CustomContextHeaders } from './custom-request-with-context'
import { CustomSessionType } from './my-custom-request'

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

