import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { createContext } from '../context/create-context'
import { CustomHeaders } from '../context/create-nested-context'
import { MyContext } from '../context/my-context'
import { ExtendedCustomRequest } from '../interfaces/user/custom-request'
import { UserWithoutSensitiveData } from '../modules/user/user'

export interface CustomRequestWithContext<T> extends Omit<Request, "context"> {
  id: string
  user?: UserWithoutSensitiveData | null
  currentUser?: UserWithoutSensitiveData | null
  ctx: MyContext<T>['ctx']
  accessToken?: string
  prisma: PrismaClient
  [key: string]: any // allow any additional properties
  req: ExtendedCustomRequest<MyContext<T>>['req']
  context: T
  body: any
  token: string
  session: any
  rawHeaders: string[]
  cookies: { [key: string]: string }
  cache: any
  credentials: RequestCredentials
  headers: CustomHeaders
  userId: string | undefined,
  request: {},
  get(name: string): string | undefined
  get(name: string | string[]): string[] | undefined
  get(name: 'set-cookie' | string): string | string | undefined
  getAll(name: string): string[] | undefined; // add this method signature
  signedCookies: Record<string, string>
}

export interface CustomRequestWithAllProps<T> extends CustomRequestWithContext<T> {
  session: any
  cache: any
  ctx: MyContext<T>['ctx']
  
  //adding get in headers 
  headers: Headers & Record<string, string | string[] | undefined> & {
    get?: (name: string) => string | undefined
  }
   // update the headers property

  credentials: RequestCredentials
  destination: RequestDestination
  integrity: string
  rawHeaders: string[]
  trailers: { [key: string]: string } 
  [Symbol.iterator]?: ()=> IterableIterator<string>
  cookies: Record<string, string>
  signedCookies: Record<string, string>
  

  get: {
    (name: string): string | undefined;
    (name: string | string[]): string[] | undefined;
    (name: 'set-cookie' | string): string | string[] | undefined;
  },
  
  // [key: string]: any // allow any additional properties
}

// Middleware function to attach our custom context to the request object
export const attachCustomContext = (): ((req: CustomRequestWithAllProps<MyContext<{}>>, res: Response, next: NextFunction) => void) => {
  return (req: CustomRequestWithAllProps<MyContext<{}>>, res: Response, next: NextFunction) => {
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
