import { PrismaClient } from '@prisma/client'
import { NextFunction, Response } from 'express'
import { IncomingHttpHeaders } from 'http'
import { type } from 'os'
import { AppConfiguration } from '../../context/app-configuration'
import { createContext } from '../../context/create-context'
import { MyContext, UserWithAccessToken } from '../../context/my-context'
import { CustomRequest } from '../../interfaces/user/custom-request'
import { UserWithoutSensitiveData } from '../../modules/user/user'
import { CustomSessionType } from '../my-custom-request'

export type YourRequestObject<T> = CustomRequestWithContext<T>;
 
  export interface CustomContextHeaders extends IncomingHttpHeaders {
  [key: string]: string | string[] | undefined
}

export interface CustomContextRequests {
  [key: string]: string | string[] | undefined
}

export interface CustomRequestWithContext<T> extends Omit<CustomSessionType, 'context'> {
  id: string
  config: AppConfiguration
  user: UserWithAccessToken 
  userId: CustomSessionType['userId']
  currentUser: UserWithAccessToken 
  accessToken: string
  prisma: PrismaClient
  destination: RequestDestination
  [key: string]: any // allow any additional properties
  req: CustomRequest
  context: MyContext<UserWithoutSensitiveData>
  body: any
  token: string
  rawHeaders: string[]
  session: CustomSessionType
  cookies: { [key: string]: string }
  signedCookies: Record<string,string>
  cache: RequestCache
  // credentials: RequestCredentials
  headers: CustomContextHeaders
  // header(name: 'set-cookie'): string | undefined;
  request: CustomRequest
 
  
//   accepts(type?: string | string[] | undefined, ...args: string[]): string | string[] | false {
//     if (type === undefined) {
//       return []
//     } else if (Array.isArray(type)) {
//       return type.map((t) => this.accepts(t, ...args))
//     } else {
//       //Implement content negotation logic and return the select content types(s)
//       //If the logic returns a single type, return it as a string, otherwise return as an array
//       return "Selected Content Types(s)"
//     }
// }
  
}


// Middleware function to attach our custom context to the request object
export const attachCustomContext = (): (
  (
  req: YourRequestObject<MyContext<{}>>,
  res: Response,
  next: NextFunction,
) => void) => {
  const customProp = 'example custom property';
  return (req: YourRequestObject<MyContext<{}>>, res: Response, next: NextFunction) => {
    req.customProp = customProp;
    next()
  }
}

export function createCustomContextWithRequest(prisma: PrismaClient, contextType: MyContext<{}>) {
  return async (req: CustomRequest<MyContext<{}>>, res: Response, next: NextFunction) => {
    req.prisma = prisma
    req.userId = req.currentUser?.id ?? undefined
    req.context = (await createContext(prisma, req)).context
    req.context.accessToken = req.context?.accessToken ?? ''
    next()
  }
}
