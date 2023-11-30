import { Context, CustomURLSearchParams, MyContext, createContext } from '@appository/backend/context-system'
import { PrismaService } from '@appository/backend/data-access'
import { UserWithAccessToken, UserWithoutSensitiveData } from '@appository/backend/users'
import { PrismaClient } from '@prisma/client'
import { NextFunction, ParamsDictionary, Request, Response } from 'express-serve-static-core'
import { IncomingHttpHeaders } from 'http'
import { AppConfiguration } from 'libs/app-configuration-system/src/app-configuration.service'
import { ParsedQs } from 'qs'
import { AccessLevel } from '../../../data-access/src/interfaces/auth/access-level'
import { CustomRequest } from './custom-request'
import { BodyContent, CustomRequestInit } from './custom-request-init'
import { CustomSessionType } from './my-custom-request'

export class YourRequestObject<T> {
  private readonly prismaService: PrismaService
  private readonly req: BodyInit | null | undefined
  readonly requestBody: BodyContent | null | undefined
  private readonly request: CustomRequest
  private readonly accessLevel: AccessLevel
  private readonly context: Context
  // private readonly session: CustomSessionType

  // accessLevel?: AccessLevel
  customProp: string
  route: string
  method: string
  documentContent?: string
  headers: CustomContextHeaders
  query: Record<string, string>
  user: UserWithoutSensitiveData | null
  params: { [key: string]: string }
  customCache: CustomSessionType
  session: CustomSessionType
  body: BodyInit | null | undefined
  URLSearchParams: CustomURLSearchParams
  accepts: (types: string | string[] | undefined) => (string | false | null)[] | undefined

  constructor() {
    this.customProp = 'custom-prop'
    this.prismaService = prismaService
    this.documentContent = 'document-content'
    this.method = 'GET'
    this.route = '/route'
    this.req ={} as URLSearchParams
    this.context = {} as Context
    this.request =  {} as CustomRequest 
    this.body = {} as BodyInit
    this.requestBody = {} as BodyContent
    this.headers = {} as CustomContextHeaders // Initialize headers if necessary
    this.accessLevel = {} as AccessLevel
    this.user = {} as UserWithoutSensitiveData
    this.query = {} as CustomSessionType
    this.session = {} as CustomSessionType
    this.URLSearchParams = {} as CustomURLSearchParams
    this.customCache = {} as CustomSessionType
    this.params = {} as { [key: string]: string }
    this.accepts = (types: string | string[] | undefined): (string | false | null)[] | undefined => {
      if (typeof types === 'string') {
        return [types]
      }
      return types
    }
  }
}

const prismaService = new PrismaService()
const yourRequestObject = new YourRequestObject<CustomRequestInit>()

export interface CustomContextHeaders extends IncomingHttpHeaders {
  [key: string]: string | string[] | undefined
}

export interface CustomRequestWithContext<T> extends Omit<CustomSessionType, 'context'> {
  [key: string]: any // allow any additional properties
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
  request: CustomRequest
  context: MyContext<UserWithoutSensitiveData>
  body: any
  token: string
  status: string
  rawHeaders: string[]
  session: CustomSessionType
  cookies: { [key: string]: string }
  signedCookies: Record<string, string>
  cache: RequestCache
  headers: CustomContextHeaders
  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
  res: Response
}

// Middleware function to attach our custom context to the request object
export const attachCustomContext = (): ((
  req: YourRequestObject<MyContext<{}>>,
  res: Response,
  next: NextFunction,
) => void) => {
  const customProp = 'example custom property'
  return (req: YourRequestObject<MyContext<{}>>, res: Response, next: NextFunction) => {
    req.customProp = customProp
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
