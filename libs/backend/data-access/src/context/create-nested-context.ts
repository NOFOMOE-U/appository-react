import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import http, { IncomingHttpHeaders } from 'http'
import { jest } from '../interfaces/user/custom-request'
import { CustomRequestWithContext } from '../make-api/custom-request-with-context'
import { UserWithoutSensitiveData } from '../modules/user/user'
import { SessionData } from '../types/express'
import { MyContext } from './my-context'

export type HeadersWithIndexSignature  =
    Record<
      string, string 
      
        | string[]
        | ((name: string, value: string) => void)
        | ((callbackFn: (value: string, name: string, headers: Headers) => void, thisArg?: any) => void)
        | undefined
    >;

export type CustomHeaders = {
  [key: string]: string | string[] | undefined;
  authorization?: string;
};
export interface ExtendedCustomRequestWithPrisma<T extends Record<string, unknown> = Record<string, unknown>>
  extends CustomRequestWithContext<MyContext<T>>{
    req: {
    session: Express.SessionData & {userId: string}
    cache: any
    context: MyContext<T>
    rawHeaders: string[] & readonly string[]
    headers: IncomingHttpHeaders
    ctx: {
      context: {}
      rawHeaders: string[] & readonly string[]
      headers: HeadersWithIndexSignature
      getAll: (name: string) => undefined
    }
    // Add any other properties that are needed
    get: (name: string) => undefined
    cookies: any
    signedCookies: any
    // Add any other properties that are needed
  } & { cache?: any } & BaseCustomRequest
}

type BaseCustomRequest = {
  readonly session: SessionData;
  readonly cache: {};
  readonly context: {};
  get: (name: string) => undefined;
  cookies: any;
  signedCookies: any;
  req: http.IncomingMessage
}

export interface MyMockContext<T> extends MyContext {
  context: MyContext<T>
  rawHeaders: string[] 
  headers: HeadersWithIndexSignature & Record<string, string | string[] | undefined>
  getAll: (name: string) => undefined
  //fixes error at line 121 to safify the constraint Record<string, unknown> for  'ExtendedCustomRequestWithPrisma<MyMockContext<T>> 
  [key:string]: unknown 
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
    currentUser: UserWithoutSensitiveData,
    req: {
      session: {
        userId: string
      }
      cache: {}
      context: MyContext<T>
      rawHeaders:  readonly string[]
      headers: HeadersWithIndexSignature
      getAll: (name: string) => undefined
      cookies: any
      signedCookies: any
      [key: string]: any // allow any additional properties
    }
  }
  cache: any
  credentials: any
  [key: string]: any // allow any additional properties
}

export const createNestedContext = <T>(context?: MyContext<T>)
  : MyContext<MyContext> => {
  // Define default values for all required properties
  const headers = new Headers()
  const headersObj: Record<string, string> = {}
  const rawHeaders= ['','Content-Type: text/html']

  for (const [key, value] of Object.entries(headersObj)) {
    headers.append(key, value)
  }

  const emptyRawHeaders:  string[] = ['']
  
  const defaultMockRequest: MockExtendedCustomRequest<MyMockContext<T>> & Partial<Request> = {

    session: { 
      userId: ''
    },
    cache: {},
    outerContext: {
      id: '',
      prisma: new PrismaClient,
      body: {},
      currentUser: {} as UserWithoutSensitiveData,
      req: {
        session: { 
          userId: ''
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
          rawHeaders: ([] as string[]) as string [] & readonly string[],
          headers: {} as HeadersWithIndexSignature,
          getAll: (name: string) => undefined,
        },
      
        currentUser: {} as UserWithoutSensitiveData,
      },
    },
    rawHeaders: emptyRawHeaders,
    credentials: undefined,
    context: createNestedContext<T>(),
    logIn: jest.fn(),
    logOut: jest.fn(),
    isAuthenticated: jest.fn(),
    isUnauthenticated: jest.fn(),    // Add all other required properties here
    // ...
  }

  const mockRequest: MockExtendedCustomRequest<MyMockContext<T>> & Partial<Request> = {
    ...defaultMockRequest,
    ctx: {
      context: context ? context : {},
      rawHeaders: [''],
      headers: {} as HeadersWithIndexSignature,
      getAll: (name: string) => {
        return undefined
      },
    },
  }

  const nestedContext: MyContext<MyContext<MyContext>> = {
    context: createNestedContext(),
    get:(name: string) => undefined,
    session: {},
    signedCookies: {},
    ctx: {
      ...mockRequest.context,
      req: mockRequest,
    },
  }

  return nestedContext
}