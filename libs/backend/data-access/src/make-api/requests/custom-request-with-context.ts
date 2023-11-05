import { PrismaClient } from '@prisma/client'
import { NextFunction, Response } from 'express'
import { IncomingHttpHeaders } from 'http'
import { AppConfiguration } from '../../context/app-configuration'
import { createContext } from '../../context/create-context'
import { MyContext, UserWithAccessToken } from '../../context/my-context'
import { CustomRequest } from '../../interfaces/user/custom-request'
import { PrismaService } from '../../lib/prisma/prisma.service'
import { UserWithoutSensitiveData } from '../../modules/user/user'
import { CustomSessionType } from '../my-custom-request'
import { CustomRequestInit } from './custom-request-init'


export class YourRequestObject<T>{
  private readonly prismaService: PrismaService
  private readonly request: CustomRequestWithContext<CustomRequestInit>
  customProp: string
  headers: CustomContextHeaders
  

  constructor() {
    this.prismaService = prismaService
    this.request = {} as CustomRequestWithContext<CustomRequestInit>
    this.customProp = ''
    this.headers = {} // Initialize headers if necessary
  }


}


const prismaService = new PrismaService();
const yourRequestObject = new YourRequestObject<CustomRequestInit>();


  export interface CustomContextHeaders extends IncomingHttpHeaders {
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
  prismaService?: PrismaService
  destination: RequestDestination
  passwordHash?: string
  customProp?: string
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
  headers: CustomContextHeaders
  request: CustomRequest

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

    // Add null check
    const context = await createContext(prisma, req)
    if (context) {
      req.context = context.context as MyContext<{}>
    } else {
      req.context = {} as MyContext<{}>
    }

    req.context.accessToken = req.context?.accessToken ?? ''
    next()
  }
}
