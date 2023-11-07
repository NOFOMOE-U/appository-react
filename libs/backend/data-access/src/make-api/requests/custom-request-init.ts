import { IncomingMessage } from 'http'
import { ParsedQs } from 'qs'
import { AppConfiguration } from '../../context/app-configuration'
import { CustomContextType } from '../../context/custom-context-type'
import { CustomURLSearchParams } from '../../context/my-context'
import { UserWithAccessToken } from '../../modules/user/user'
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

export interface CustomRequestInitWithGet extends CustomRequestInit {
  get?: (name: string) => string | null | undefined
}
