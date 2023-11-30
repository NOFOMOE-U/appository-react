import { PrismaClient } from '@prisma/client'
import { Headers } from 'node-fetch'
import { AppConfiguration } from '../../../../app-configuration-system/src/app-configuration.service'
import { BodyContent, CustomRequestInit } from '../make-api/requests/custom-request-init'
import { CustomRequestWithContext, YourRequestObject } from '../make-api/requests/custom-request-with-context'
import { UserWithAccessToken } from '../modules/user/user'
import { UserService } from '../modules/user/user.service'
import { CustomContextType } from './custom-context-type'
import { CustomURLSearchParams, MyContext } from './my-context'

const prisma = new PrismaClient()

export interface HeadersWithCustomURLSearchParams extends Headers {
  getSetCookie: () => string[];
  sort: () => void;
}

export const createInitialContext = (req: CustomRequestWithContext<MyContext>): MyContext => {
  const accessToken = req.get('access-token') || ''
  // create an instance of Headers,
  const headers = new Headers()
  //loop through key value pairs from the entries
  //use the parse method of the http module to
  // parse the headers key value from a string
  for (const [key, value] of Object.entries(req.headers)) {
    //then parse the key and value to set as a string on headers.
    headers.set(key, value as string)
  }

  const context: MyContext = {
    userService: {} as UserService,
    URLSearchParams: {
      size: 0,
      keys: (): IterableIterator<string> => {
        return headers.keys()
      },

      values(): IterableIterator<string> {
        return headers.values()
      },

      entries(): IterableIterator<[string, string]> {
        return headers.entries()
      },

      append(name: string, value: string) {
        return headers.append(name, value)
      },

      has(key: string) {
        return headers.has(key)
      },

      set(key: string, value: string) {
        return headers.set(key, value)
      },

      forEach(callback: (value: string, name: string, parent?: Headers | CustomURLSearchParams | undefined) => void) {
        return headers.forEach(callback)
      },
      get(name: string): string {
        const value = ''
        return value
      },
      sort: () => [],
      getSetCookie: () => [],

      getAll(name: string): string[] {
        return []
      },

      delete(name: string) {
        return headers.delete(name)
      },

      [Symbol.iterator](): IterableIterator<[string, string]> {
        return headers.entries()
      },
    } as CustomURLSearchParams,

    config: {} as AppConfiguration,
    ctx: {} as CustomContextType,
    user: {} as UserWithAccessToken,
    request: {} as YourRequestObject<CustomRequestInit>,
    body: 'initaial-body',
    requestBody: {} as BodyContent | null | undefined,
    accessToken: null,
    url: 'url',
    session: {
      userId: 'user-id',
      username: '',
      currentUser: {} as UserWithAccessToken,
      expires: 0,
      user: {} as UserWithAccessToken,
      yourSessionKey: 'session-key',
    },
    size: 0,
    signedCookies: {} as Record<string, string>,
    entries: function (): IterableIterator<[string, string]> {
      throw new Error('Function not implemented.')
    },
    keys: function (): IterableIterator<string> {
      throw new Error('Function not implemented.')
    },
    values: function (): IterableIterator<string> {
      throw new Error('Function not implemented.')
    },
    append: function (key: string, value: string): void {
      throw new Error('Function not implemented.')
    },
    has: function (key: string): boolean {
      throw new Error('Function not implemented.')
    },
    set: function (key: string, value: string): void {
      throw new Error('Function not implemented.')
    },
    sort: function (key: string, value: string): void {
      throw new Error('Function not implemented.')
    },
    forEach: function (
      callback: (value: string, name: string, parent?: CustomURLSearchParams | globalThis.Headers | undefined) => void,
    ): void {
      throw new Error('Function not implemented.')
    },
    delete: function (name: string): void {
      throw new Error('Function not implemented.')
    },
    getAll: function (names: string[]): string[] {
      throw new Error('Function not implemented.')
    },
    accepts: function (types: string | string[] | undefined): string[] {
      throw new Error('Function not implemented.')
    },
    [Symbol.iterator]: function (): IterableIterator<[string, string]> {
      throw new Error('Function not implemented.')
    },
  }

  return context
}

//define an asynchronous function that initializes the context
export const initContext = async (req: CustomRequestWithContext<MyContext>): Promise<MyContext> => {
  const context = createInitialContext(req) as unknown as MyContext<CustomContextType>
  return context
}

// #review usecase
// this file is to provide a centralized way to manage the context object for a NestJS application.
// The context object contains various properties related to the current request and user,
// and it can be used by other parts of the application to access this information.

// This file should be used whenever a NestJS application needs to manage context information for
// requests and users.For example, if an application needs to retrieve user information for a specific
// request or needs to store information that needs to persist across multiple requests, this file can be used to create and manage
// the context object.
