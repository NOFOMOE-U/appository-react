import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import { Session } from 'express-session'
import { jest } from '../interfaces/user/custom-request'
import { CustomSessionType } from '../make-api/my-custom-request'
import { CustomContextHeaders, CustomRequestWithContext, YourRequestObject } from '../make-api/requests/custom-request-with-context'
import { UserWithoutSensitiveData } from '../modules/user/user'
import { AppConfiguration } from './app-configuration'
import { CustomContextType } from './custom-context-type'
import { MyContext } from './my-context'
import { boolean } from 'joi'
import { CustomRequestInit } from '../make-api/requests/custom-request-init'
export type HeadersWithIndexSignature = Record<
  string,
  string>

export interface CustomHeaders {
  [key: string]:
  | string
  | string[]
  | ((name: string, value: string) => void)
  | ((callbackFn: (value: string, name: string, headers: Headers) => void, thisArg?: any) => void)
  | undefined;

  has(name: string): boolean;
  set(name: string, value: string): this;
  get(name: string): string | null;
  delete(name: string): boolean;
  append(name: string, value?: string): this;
  keys(): IterableIterator<string>;
  entries(): IterableIterator<[string, string]>;
  values(): IterableIterator<string>;
  getAll(name: string): string[];
  [Symbol.iterator](): IterableIterator<[string, string]>;
}

export interface MyMockContext<T> extends MyContext {
  context: MyContext<{}>
  rawHeaders: string[]
  headers: Record<string, string | string[] | undefined>
  getAll: (name: string) => undefined
  //fixes error at line 121 to safify the constraint Record<string, unknown> for  'ExtendedCustomRequestWithPrisma<MyMockContext<T>>
  [key: string]: unknown
  // Add the other required properties here
}

export interface MockExtendedCustomRequest<T extends {}> {
  session: {
    userId: string
  }
  outerContext: {
    id: string
    prisma: any
    body: any
    currentUser: UserWithoutSensitiveData
    req: {
      session: {
        userId: string
      }
      cache: {}
      context: MyContext<T>
      rawHeaders: readonly string[]
      headers: HeadersWithIndexSignature
      getAll: (name: string) => undefined
      cookies: any,
      signedCookies: Record<string, string>
      [key: string]: any // allow any additional properties
    }
  }
  cache: any
  // credentials: any
  [key: string]: any // allow any additional properties
}

export const createNestedContext = <T>(context?: MyContext<T>): CustomContextType<MyContext<T>> => {
  // Define default values for all required properties
  const headers = new Headers()
  const headersObj: Record<string, string> = {}
  const rawHeaders = ['', 'Content-Type: text/html']

  for (const [key, value] of Object.entries(headersObj)) {
    headers.append(key, value)
  }

  const emptyRawHeaders: string[] = ['']

  const defaultMockRequest: MockExtendedCustomRequest<MyMockContext<T>> & Partial<Request> = {
    session: {
      userId: context?.session.userId,
      yourSessionKey: '',
      username: context?.session.username,
      expires: 15,//todo update to accurate expiration
    } as unknown as CustomSessionType & Session,
    cache: {},
    outerContext: {
      id: '',
      prisma: new PrismaClient(),
      body: {},
      currentUser: {} as UserWithoutSensitiveData,
      req: {
        session: {
          userId: '',
        },
        cache: {},
        context: {} as MyContext<MyMockContext<T>>,
        rawHeaders: rawHeaders,
        headers: {} as HeadersWithIndexSignature,
        cookies: {},
        signedCookies: {},
        getAll: (name: string) => undefined,
        get: (name: string) => undefined,
        ctx: {
          context: {},
          rawHeaders: [] as string[] as string[] & readonly string[],
          headers: {} as HeadersWithIndexSignature,
          getAll: (name: string) => undefined,
        },

        currentUser: {} as UserWithoutSensitiveData,
      },
    },
    rawHeaders: emptyRawHeaders,
    context: createNestedContext<T>(),
    logIn: jest.fn(),
    logOut: jest.fn(),
    isAuthenticated: jest.fn(),
    isUnauthenticated: jest.fn(), // Add all other required properties here
    // ...
  }

  const defaultHeaders: CustomContextHeaders = {}

  const mockRequest: MockExtendedCustomRequest<MyMockContext<T>> & Partial<Request> = {
    ...defaultMockRequest,
    headers: defaultHeaders,
    ctx: {
      context: context ? context : {},
      rawHeaders: [''],
      headers: {} as HeadersWithIndexSignature,
      getAll: (name: string) => {
        return undefined
      },
      accepts: () => {
        return undefined;
      }
    },
  }

  const nestedContext: CustomContextType<MyContext<T>> = {
    context,
    get: (name: string) => undefined,
    currentUser: mockRequest.outerContext.currentUser,
    session: {} as CustomSessionType & Session,
    signedCookies: {} as Record<string, string>,
    config: {} as AppConfiguration,
    request: {} as YourRequestObject<CustomRequestInit>,
    req: {} as CustomRequestWithContext<T>,
    prisma: mockRequest.outerContext.prisma,
    cache: mockRequest.req.outerContext.cache,
    cookie: mockRequest.req.outerContext.cookie, 
    cookies: mockRequest.req.outerContext.cookies,
    token: mockRequest.req.outerContext.accessToken,
    accepts: mockRequest.req.outerContext.accepts,
    accessToken: undefined,
    ctx: {
      ...mockRequest.context,
      req: mockRequest.req,
      accepts: (types: string | string[] |
       boolean) => {
        if (types === 'string') {
          return [types]
        }
        if (Array.isArray(types)) {
          return types
        }
        if (types === true || types === false) {
          return types
        }
        return []
      },
        
    }
  }

  return nestedContext
}




