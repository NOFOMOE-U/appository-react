import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { UserWithoutSensitiveData } from '../modules/user/user'
import { createContext } from './create-context'
import { MyContext } from './mycontext'
// import {any}


export interface CustomRequestWithContext<T> extends Omit<Request, "context"> {
  id: string
  user?: UserWithoutSensitiveData | null
  currentUser?: UserWithoutSensitiveData | null
  context: MyContext<T>
  accessToken?: string
  prisma: PrismaClient
  [key: string]: any // allow any additional properties

  body: any
  token: string
  session: any
  rawHeaders: string[]
  cookies: { [key: string]: string }
  ctx: T
  cache: any
  credentials: RequestCredentials
  headers: {
    [key: string]: string | string[] | undefined;
    authorization?: string | undefined;
  }
  userId: string | undefined,
  request: {},
  getAll(name: string): string[] | undefined; // add this method signature
}

export interface CustomRequestWithAllProps<T> extends CustomRequestWithContext<T> {
  session: any
  ctx: T
  cache: any
  
  headers: {
    [key: string]: string | string[] | undefined;
    authorization?: string | undefined;
  }

  // credentials?: string;
  credentials: RequestCredentials
  destination: RequestDestination
  integrity: string
  rawHeaders: string[]
  trailers: { [key: string]: string } 
  [Symbol.iterator]?: ()=> IterableIterator<string>
  cookies: Record<string, string>
  signedCookies: Record<string, string>
  [key: string]: any // allow any additional properties
}

// Middleware function to attach our custom context to the request object
export const attachCustomContext = (): ((req: CustomRequestWithContext<MyContext<{}>>, res: Response, next: NextFunction) => void) => {
  return (req: CustomRequestWithContext<MyContext<{}>>, res: Response, next: NextFunction) => {
    const customProp = 'example custom property'
    ;(req.customProp = customProp), next()
  }
}

export function createCustomContextWithRequest(prisma: PrismaClient, contextType: MyContext<{}>) {
  return async (req: CustomRequestWithAllProps<MyContext<{}>>, res: Response, next: NextFunction) => {
    req.prisma = prisma
    req.userId = req.currentUser?.id ?? undefined
    req.context = (await createContext(prisma, req)) as MyContext<{}>
    req.context.accessToken = req.context.accessToken ?? ''
    next()
  }
}
