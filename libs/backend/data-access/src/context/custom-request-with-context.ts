import { PrismaClient } from '@prisma/client'
import { NextFunction, Response } from 'express'
import { UserWithoutSensitiveData } from '../modules/user/user'
import { createContext } from './create-context'
import { CustomContextType } from './custom-context-types'
import { MyContext } from './mycontext'
// import {any}

export interface CustomRequestWithContext<T> extends Request {
  id: string
  user?: UserWithoutSensitiveData | null
  currentUser?: UserWithoutSensitiveData | null
  context: T & {}
  accessToken?: string | null
  prisma: any
  [key: string]: any // allow any additional properties

  body: any
  session: any
  cookies: { [key: string]: string }
  get(name: string): string | undefined
  ctx: T
  cache: any
  credentials: RequestCredentials
}

interface CustomRequestWithAllProps<T> extends CustomRequestWithContext<T> {
  session: any
  ctx: T
  cache: any

  // credentials?: string;
  credentials: RequestCredentials
  destination: RequestDestination
  integrity: string
  cookies: Record<string, string>
  signedCookies: Record<string, string>
  [key: string]: any // allow any additional properties
}

// Middleware function to attach our custom context to the request object
export const attachCustomContext = (): ((req: CustomContextType, res: Response, next: NextFunction) => void) => {
  return (req: CustomContextType, res: Response, next: NextFunction) => {
    const customProp = 'example custom property'
    ;(req.customProp = customProp), next()
  }
}

export function createCustomContextWithRequest(prisma: PrismaClient, contextType: MyContext<{}>) {
  return async (req: CustomRequestWithAllProps<MyContext<{}>>, res: Response, next: NextFunction) => {
    req.prisma = prisma
    req.userId = req.currentUser?.id ?? undefined
    req.context = await createContext(prisma, req)

    next()
  }
}
