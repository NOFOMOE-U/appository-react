import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import { Session } from 'express-session'
import http, { IncomingHttpHeaders } from 'http'
import { jest } from '../interfaces/user/custom-request'
import { CustomSessionType } from '../make-api/my-custom-request'
import { UserWithoutSensitiveData } from '../modules/user/user'
import { SessionData } from '../types/express'
import { AppConfiguration } from './app-configuration'
import { MyContext } from './my-context'
export type HeadersWithIndexSignature = Record<
  string,
  string>
  & {
   
[name:string]:string 
| string[]
| ((name: string, value: string) => void)
| ((callbackFn: (value: string, name: string, headers: Headers) => void,
  thisArg?: any) => void)
| undefined;
}

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


type BaseCustomRequest = {
  readonly session: SessionData
  readonly cache: {}
  readonly context: {}
  get: (name: string) => undefined
  cookies: any
  signedCookies: any
  req: http.IncomingMessage
}

export interface MyMockContext<T> extends MyContext {
  context: MyContext<MyContext<MyContext<{}>>>
  rawHeaders: string[]
  headers: HeadersWithIndexSignature & Record<string, string | string[] | undefined>
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
      cookies: any
      signedCookies: any
      [key: string]: any // allow any additional properties
    }
  }
  cache: any
  // credentials: any
  [key: string]: any // allow any additional properties
}

export const createNestedContext = <T>(context?: MyContext<T>): MyContext<MyContext<MyContext>> => {
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
      userId: '',
      yourSessionKey: ''
    } as Session & Partial<SessionData>,
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
    // credentials: undefined,
    context: createNestedContext<T>(),
    logIn: jest.fn(),
    logOut: jest.fn(),
    isAuthenticated: jest.fn(),
    isUnauthenticated: jest.fn(), // Add all other required properties here
    // ...
  }

  const defaultHeaders: IncomingHttpHeaders ={}

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

  const nestedContext: MyContext<MyContext<MyContext<{}>>> = {
    context: createNestedContext(),
    get: (name: string) => undefined,
    currentUser: mockRequest.outerContext.currentUser,
    session: {} as CustomSessionType,
    signedCookies: {} as Record<string,string>,
    config: {} as AppConfiguration,
    ctx: {
      ...mockRequest.context,
      req: mockRequest,
      accepts: () => {
        return undefined
      }
    },
    accepts: function (types: string | string[]): string[] {
      if (typeof types === 'string') {
        return [types];
      } else if (Array.isArray(types)) {
        return types;
      } else {
        return [];
      }
    }    
  }

  return nestedContext
}
