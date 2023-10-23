import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { Session, SessionData } from 'express-session'
import { IncomingHttpHeaders } from 'http'
import { ParsedQs } from 'qs'
import { AppConfiguration } from '../../context/app-configuration'
import { createContext } from '../../context/create-context'
import { CustomContextType } from '../../context/custom-context-type'
import { MyContext } from '../../context/my-context'
import { UserWithoutSensitiveData } from '../../modules/user/user'

export type YourRequestObject<T> = CustomRequestWithContext<T>;
;
  
  export interface CustomContextHeaders extends IncomingHttpHeaders {
  [key: string]: string | string[] | undefined
}

export interface CustomContextRequests {
  [key: string]: string | string[] | undefined
}

export interface CustomRequestWithContext<T> extends Omit<Request, 'context'> {
  id: string
  config: AppConfiguration
  user?: UserWithoutSensitiveData | null
  currentUser: UserWithoutSensitiveData | null
  ctx: MyContext<T>['ctx']
  accessToken: string
  prisma: PrismaClient
  destination: RequestDestination
  [key: string]: any // allow any additional properties
  req: {
    headers: CustomContextHeaders
    session: Session & Partial<SessionData>
    cache: RequestCache
    context: CustomContextType
    get: (name: string) => string | undefined
    signedCookies: Record<string, string>
    method: string
    url: string
    baseUrl: string
    originalUrl: string
    params: ParamsDictionary
    query: ParsedQs
    body: any
    cookies: {[key: string]: string}
    ip: string
    ips: string[]
    protocol: string
    secure: boolean
    stale: boolean
    fresh: boolean
    xhr: boolean
    hostname: string
    subdomains: string[]
  }
  context: MyContext<UserWithoutSensitiveData>
  body: any
  token: string
  session: Session & Partial<SessionData> & { userId: string}
  rawHeaders: string[]
  cookies: { [key: string]: string }
  cache: RequestCache
  // credentials: RequestCredentials
  headers: CustomContextHeaders
  userId: string | undefined
  request: {} //updated to request cache from {},
  get(name: string): string | undefined
  get(name: string | string[]): string[] | undefined
  get(name: 'set-cookie' | string): string | string | undefined
  getAll(name: string): string[] | undefined
  signedCookies: Record<string, string>
}

export interface CustomRequestWithAllProps<T> extends CustomRequestWithContext<T> {
  session: any
  cache: any
  ctx: MyContext<T>['ctx']

  //adding get in headers
  headers: CustomContextHeaders
  // update the headers property

  // credentials: RequestCredentials
  destination: RequestDestination
  // integrity: string
  rawHeaders: string[]
  trailers: { [key: string]: string }
  [Symbol.iterator]?: () => IterableIterator<string>
  cookies: Record<string, string>
  signedCookies: Record<string, string>

  get: {
    (name: string): string | undefined
    (name: string | string[]): string[] | undefined
    (name: 'set-cookie' | string): string | string[] | undefined
  }

  // [key: string]: any // allow any additional properties
}

// Middleware function to attach our custom context to the request object
export const attachCustomContext = (): ((
  req: YourRequestObject<MyContext<{}>>,
  res: Response,
  next: NextFunction,
) => void) => {
  return (req: YourRequestObject<MyContext<{}>>, res: Response, next: NextFunction) => {
    const customProp = 'example custom property'
    ;(req.customProp = customProp), next()
  }
}

export function createCustomContextWithRequest(prisma: PrismaClient, contextType: MyContext<{}>) {
  return async (req: CustomRequestWithAllProps<MyContext<{}>>, res: Response, next: NextFunction) => {
    req.prisma = prisma
    req.userId = req.currentUser?.id ?? undefined
    req.ctx = (await createContext(prisma, req)).ctx
    req.ctx.accessToken = req.ctx.accessToken ?? ''
    next()
  }
}
