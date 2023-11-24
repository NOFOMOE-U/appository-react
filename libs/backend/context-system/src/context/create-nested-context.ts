import { CustomContextHeaders, CustomSessionType, UserWithoutSensitiveData, jest } from '@appository/backend/data-access'
import { PrismaClient } from '@prisma/client'
import { Request, Session, SessionData } from 'libs/backend/users/src/types/express'
import { CustomContextType } from './custom-context-type'
import { MyContext } from './my-context'
export type HeadersWithIndexSignature = Record<string, string>

export interface CustomHeaders {
  [key: string]:
    | string
    | string[]
    | ((name: string, value: string) => void)
    | ((callbackFn: (value: string, name: string, headers: Headers) => void, thisArg?: any) => void)
    | undefined

  has(name: string): boolean
  set(name: string, value: string): this
  get(name: string): string | null
  delete(name: string): boolean
  append(name: string, value?: string): this
  keys(): IterableIterator<string>
  entries(): IterableIterator<[string, string]>
  values(): IterableIterator<string>
  getAll(names: string): string[]
  [Symbol.iterator](): IterableIterator<[string, string]>
}

export interface MyMockContext<T> extends MyContext {
  context: MyContext<{}>
  rawHeaders: string[]
  headers: Record<string, string | string[] | undefined>
  getAll: (name: string[]) => string[]
  //fixes error at line 121 to safify the constraint Record<string, unknown> for  'ExtendedCustomRequestWithPrisma<MyMockContext<T>>
  [key: string]: unknown
  // Add the other required properties here
}

export interface MockExtendedCustomRequest<T extends {}> {
  session: CustomSessionType & SessionData
  outerContext: {
    id: string
    prisma: any
    body: any
    currentUser: UserWithoutSensitiveData
    req: {
      session: {
        userId: string
      }
      cache: RequestCache
      context: MyContext<T>
      rawHeaders: readonly string[]
      headers: HeadersWithIndexSignature
      getAll: (name: string[])  => string[]
      cookies: any
      signedCookies: Record<string, string>
      [key: string]: any // allow any additional properties
    }
  }
  cache: RequestCache
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
    session: {} as Session & Partial<SessionData>,
    cache: {} as RequestCache,
    outerContext: {
      id: SessionData.id,
      prisma: new PrismaClient(),
      body: {},
      currentUser: {} as UserWithoutSensitiveData,
      req: {
        session: {
          userId: '',
        },
        cache: {} as RequestCache,
        context: {} as MyContext<MyMockContext<T>>,
        rawHeaders: rawHeaders,
        headers: {} as HeadersWithIndexSignature,
        cookies: {} as Record<string, string>,
        signedCookies: {},
        getAll: (name: string[]) => [],
        get: (name: string) => undefined,
        ctx: {
          context: {
            ...context,
          },
          rawHeaders: [] as string[] as string[] & readonly string[],
          headers: {} as HeadersWithIndexSignature,
          getAll: (name: string[]) => [],
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
    headers: defaultHeaders as Headers & CustomHeaders,
    ctx: {
      context: context ? context : {},
      rawHeaders: [''],
      headers: {} as HeadersWithIndexSignature,
      getAll: (name: string[])  => {
        return undefined
      },
      accepts: () => {
        return undefined
      },
    },
  }

  const nestedContext: CustomContextType<MyContext<T>> = {
    ...mockRequest.ctx,
    ctx: {
      context: context ? context : {},
      rawHeaders: [''],
      headers: {} as HeadersWithIndexSignature,
      getAll: (name: string[])  => {
        return undefined
      },
      accepts: () => {
        return undefined
      },
    },
  }

  return nestedContext
}
