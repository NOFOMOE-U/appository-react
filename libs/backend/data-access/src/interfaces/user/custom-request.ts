  //4. create a request when a client makes a request to the server
  import { PrismaClient, User, UserRole } from '@prisma/client'
import { AxiosRequestConfig } from 'axios'
import { Request } from 'express'
import { createNestedContext } from '../../context/create-nested-context'
import { CustomRequestWithContext } from '../../context/custom-request-with-context'
import { MyContext } from '../../context/mycontext'
import { UserWithoutSensitiveData } from '../../modules/user/user'

  const prisma = new PrismaClient()

  declare const jest: {
    fn: Function
  }

  interface SafeUser extends Omit<User, 'passwordHash' | 'resetPasswordToken'> {
    passwordHash?: undefined
    resetPasswordToken?: string
  }

  //using the generate Type parameter of T allows us to be able to add
  // additional properities to the reqquest object as needed.
  export interface CustomRequest<T = {}> extends Request {
    id?: string
    user?: UserWithoutSensitiveData | null
    userId?: string
    body: T | undefined
    headers: {
      authorization?: string
      [key: string]: string | string[] | undefined
    }
    
    startTime?: number
    // prisma: PrismaClient
    currentUser?: UserWithoutSensitiveData | undefined | null
    accessToken?: string | null
    context?: T
    get(name: 'set-cookie'| string): string | undefined
    get(name: string | string[]): string[] | undefined}

  // Define the ExtendedCustomRequest interface that extends CustomRequest with additional properties
  export interface ExtendedCustomRequest<T extends {} = {}> extends CustomRequest<T> {
    context?: T
    cache?: string
    credentials?: string
    destination?: string
    integrity?: string
    accessToken?: string
    headers: Record<string, string | string[] | undefined> 
    get(name: 'set-cookie'| string):  string | string | undefined
    get(name: string | string[]): string[] | undefined

    cookies: Record<string, string>
    signedCookies: Record<string, string>
    ctx: T
  }

  export const getHeaderValue = (
    req: ExtendedCustomRequest<MyContext>,
    name: 'set-cookie' | string,
  ): string | string[] | undefined => {
    const headerValue = req.headers[name]
    if (headerValue === undefined) {
      return undefined
    }
    if (name === 'set-cookie') {
      return Array.isArray(headerValue) ? headerValue : [headerValue]
    } else {
      return typeof headerValue === 'string' ? [headerValue] : headerValue
    }
  }

  export const defaultOptions = (
    req: ExtendedCustomRequest<MyContext>,
  ): AxiosRequestConfig => ({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers.authorization,
      'Cookie': req.headers.cookie,
      'Set-Cookie': getHeaderValue(req, 'set-cookie'),
    },
    baseURL: process.env.API_URL,
    responseType: 'json',
  })
  const currentUser: UserWithoutSensitiveData = {
    id: '123',
    email: 'test@example.com',
    name: 'Test User',
    roles: [UserRole.USER],
    createdAt: new Date(),
    updatedAt: new Date(),
    userProfileId: null,
  }

  const safeUser: SafeUser = {
    id: currentUser.id,
    email: currentUser.email,
    name: currentUser.name,
    roles: currentUser.roles,
    createdAt: currentUser.createdAt,
    updatedAt: currentUser.updatedAt,
    userProfileId: currentUser.userProfileId,
    passwordHash: undefined,
  }

  const mockRequest= <T>(context?: MyContext<T>): CustomRequestWithContext<MyContext<MyContext<T>>> => {
    const nestedContext = createNestedContext(context || {} as MyContext<T>)
    return {
      ...nestedContext.request,
      context: nestedContext,
      get: jest.fn(),
      header: jest.fn(),
    } as CustomRequestWithContext<MyContext<MyContext<T>>>
    
  } 

  export default mockRequest
