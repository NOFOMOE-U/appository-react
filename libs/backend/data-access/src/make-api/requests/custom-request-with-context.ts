import { PrismaClient } from '@prisma/client'
import { NextFunction, Response } from 'express'
import { IncomingHttpHeaders } from 'http'
import { AppConfiguration } from '../../context/app-configuration'
import { createContext } from '../../context/create-context'
import { MyContext, UserWithAccessToken } from '../../context/my-context'
import { UserWithoutSensitiveData } from '../../modules/user/user'
import { CustomSessionType } from '../my-custom-request'
import { CustomRequest, getHeaderValue } from '../../interfaces/user/custom-request'

export type YourRequestObject<T> = CustomRequestWithContext<T>;
 
  export interface CustomContextHeaders extends IncomingHttpHeaders {
  [key: string]: string | string[] | undefined
}

export interface CustomContextRequests {
  [key: string]: string | string[] | undefined
}

// type SessionRequestContext = {
//   req: {
//     headers: CustomContextHeaders
//     session: Session & Partial<SessionData>
//     cache: RequestCache
//     context: CustomContextType
//     get: (name: string) => string | undefined
//     signedCookies: Record<string, string>
//     method: string
//     url: string
//     baseUrl: string
//     originalUrl: string
//     params: ParamsDictionary
//     query: ParsedQs
//     body: any
//     cookies: {[key: string]: string}
//     ip: string
//     ips: string[]
//     protocol: string
//     secure: boolean
//     stale: boolean
//     fresh: boolean
//     xhr: boolean
//     hostname: string
//     subdomains: string[]
//   }
// }

export interface CustomRequestWithContext<T> extends Omit<CustomSessionType, 'context'> {
  id: string
  config: AppConfiguration
  user: UserWithAccessToken 
  userId: CustomSessionType['userId']
  currentUser: UserWithAccessToken 
  ctx: MyContext<T>['ctx']
  accessToken: string
  prisma: PrismaClient
  destination: RequestDestination
  [key: string]: any // allow any additional properties
  req: CustomRequest
  context: MyContext<UserWithoutSensitiveData>
  body: any
  token: string
  session: CustomSessionType
  rawHeaders: string[]
  cookies: { [key: string]: string }
  signedCookies: Record<string,string>
  cache: RequestCache
  // credentials: RequestCredentials
  headers: CustomContextHeaders
  // header(name: 'set-cookie'): string | undefined;
  request: Request
  get(...headerNames: (string | string[])[]): string | string[] | undefined {
    const headerNames = [] as string[]; 
  if(!this.headers){
    return undefined
  }
  const headers = headerNames.map((name) => {
      if (Array.isArray(name)) {
        return name
          .map((header) => getHeaderValue(this.headers as CustomContextHeaders, header))
          .filter((value) => value !== undefined && value !== null);
      } else {
        const value = getHeaderValue(this.headers as CustomContextHeaders, name);
        return value !== undefined && value !== null ? value : [];
      }
    }).filter(Boolean);

    if (headers.length === 0) {
      return undefined;
    }

    return headers.length === 1 ? headers[0] : headers;
  }

  // ... other properties and methods ...
}

  
  // accepts(): string[];
  // accepts(type: string): string | false;
  // accepts(type: string[]): string | false;
  // accepts(...type: string[]): string | false;
  // acceptsCharsets(): string[];
  // acceptsCharsets(charset: string): string | false;
  // acceptsCharsets(charset: string[]): string | false;
  // acceptsCharsets(...charset: string[]): string | false;

  // acceptsEncodings(): string[];
  // acceptsEncodings(encoding: string): string | false;
  // acceptsEncodings(encoding: string[]): string | false;
  // acceptsEncodings(...encoding: string[]): string | false;


  // acceptsEncodings(): string[];
  // acceptsLanguages(): string[];
  // acceptsLanguages(): string[];
  // acceptsLanguages(lang: string): string | false;
  // acceptsLanguages(lang: string[]): string | false;
  // acceptsLanguages(...lang: string[]): string | false;

 }


export interface CustomRequestWithAllProps<T> extends CustomRequestWithContext<T> {
  session: any
  cache: any
  ctx: MyContext<T>['ctx']
  //adding get in headers
  headers: CustomContextHeaders
  // update the headers property
  // credentials: RequestCredentials
  // destination: RequestDestination
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
