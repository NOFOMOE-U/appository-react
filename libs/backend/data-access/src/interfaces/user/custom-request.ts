//4. create a request when a client makes a request to the server
import { User } from '@prisma/client'
import { Request } from 'express'
import { Session, SessionData } from 'express-session'
import { CustomRequestCommon } from '../../context/custom-common-request'
import { MyContext } from '../../context/my-context'
import { CustomContextHeaders } from '../../make-api/requests/custom-request-with-context'
import { UserWithoutSensitiveData } from '../../modules/user/user'
// const prisma = new PrismaClient()

export declare const jest: {
  fn: Function
}

export interface SafeUser extends Omit<User, 'passwordHash' | 'resetPasswordToken'> {
  passwordHash?: undefined
  resetPasswordToken?: string
}


//using the generate Type parameter of T allows us to be able to add
// additional properities to the reqquest object as needed.
export interface CustomRequest<T = unknown> extends Request {
  id?: string
  user?: UserWithoutSensitiveData | null
  userId?: string
  query: any;
  params: any;
  body: T | undefined
  headers: CustomContextHeaders
  startTime?: number
  cache: RequestCache
  currentUser?: UserWithoutSensitiveData | undefined | null
  accessToken?: string | null
  context?: T
}

// Define the ExtendedCustomRequest interface that extends CustomRequest with additional properties
export interface ExtendedCustomRequest<T extends {} = {}> extends CustomRequestCommon, CustomRequest<T> {
  context?: T
  credentials?: string
  // destination?: string
  session: Session & Partial<SessionData> & {userId: string}
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
  ctx?: MyContext<T>['ctx']
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

