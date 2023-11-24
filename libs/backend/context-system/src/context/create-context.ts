import { PrismaClient, User} from '@prisma/client';
  
import { IncomingMessage } from 'http';
import { convertUserToUserWithAccessToken } from 'libs/backend/data-access/src/interfaces/auth/authenticate';
import {  RequestCache } from '@appository/backend/data-access';
import {CustomRequest} from '@appository/backend/request-options'
import { PrismaService } from '@appository/backend/data-access';
import { CustomSessionType } from '@appository/backend/data-access';
import { BodyContent, CustomRequestInit } from 'libs/backend/data-access/src/make-api/requests/custom-request-init';
import { YourRequestObject } from '@appository/backend/data-access';
import { UserWithAccessToken, UserWithoutSensitiveData} from '@appository/backend/data-access';
import createCustomContext, { CustomContextProps, CustomContextType } from './custom-context-type';
import { CustomURLSearchParams, MyContext } from './my-context';
import { valid } from 'joi';
 
let prismaService: PrismaService 

  export const createContext = async (
    prisma: PrismaClient,
    req: CustomRequest<{}>,
    // & CustomRequest
  ): Promise<CustomContextType<MyContext>> => {
    prismaService = new PrismaService()
    const contextProps: CustomContextProps = await createCustomContext(prisma, req)
    const currentUser  = contextProps.currentUser

    const cookies = req?.headers?.cookie ?? undefined
    const cookiesArray = Array.isArray(cookies) ? cookies : [cookies]
    const filteredCookies = cookiesArray.filter(
      (cookie: string | undefined): cookie is string => typeof cookie === 'string',
    )

    const sessionData = req.session
    const token = sessionData.yourSessionKey ?? undefined

    let currentUserWithAccessToken: UserWithAccessToken | User | undefined  
    if (currentUser) {
      if (typeof currentUser === 'object' && 'passwordHash' in currentUser === false) {
        // Handle case where currentUser is UserWithoutSensitiveData
        if (!('passwordHash' in currentUser)) {
          const currentUser = currentUserWithAccessToken 
          currentUserWithAccessToken = convertUserToUserWithAccessToken(currentUser as User)
          //add a type assertion to set currentUserWithAccessToken as User
        }
      }
      // Handle case where currentUser is undefined
      // You could throw an error, return early, or provide a default value
    } else {
      // currentUser is defined, so we can safely cast
      currentUserWithAccessToken = convertUserToUserWithAccessToken(currentUser as unknown as User)
    }

    if (currentUserWithAccessToken) {
      // Use currentUserWithAccessToken here since we checked it is not null
    }

    const customReq: MyContext<UserWithoutSensitiveData> = {
      ...req,
      size: filteredCookies.length,
      customProp: 'custom value',
      req: {} as IncomingMessage,
      token: token as string,
      id:  req.id as string,
      body: req.body as BodyInit , //removed to test,
      requestBody: {} as BodyContent, // removed to test | null | undefined,
      URLSearchParams: {} as CustomURLSearchParams,
      ctx: {} as CustomContextType,
      request: {} as YourRequestObject<CustomRequestInit>,
      accessToken: req.accessToken as string,
      currentUser: sessionData.currentUser,
      prismaService: prismaService,
      userId: sessionData.user?.id as string,
      user: currentUserWithAccessToken as unknown as UserWithAccessToken,
      entries: function (): IterableIterator<[string, string]> {
        return this.req.url.split('&').map((p: string) => p.split('=')).entries()
      },
      keys: function (): IterableIterator<string> {
        return this.req.url.split('&').map((p: string) => p.split('=')[0]).values()
      },
      append: function (key: string, value: string): void {
        this.set(key, this.get(key) ? `${this.get(key)},${value}` : value);
      },
      values: function (): IterableIterator<string> {
        return this.req.url.split('&').map((p: string) => p.split('=')[1]).values()
      },
      has: function (key: string): boolean {
        return Object.keys(this).includes(key);
      },
      set: function (key: string, value: string): void {
        this[key] = value;
      },
      sort: function (key: string, value: string): void {
        this.set(key, [...this.get(key)].sort().join(','))
      },
      forEach: function (callback: (value: string, name: string, parent?: CustomURLSearchParams | Headers | undefined) => void): void {
        Object.keys(this).forEach(key => {
          callback(this[key], key, this);
        });
      },
      delete: function (name: string): void {
        delete this[name];
      },
      getAll: function (names: string[]): string[] {
        return names.map(name => this.get(name) as string);
      },
      [Symbol.iterator]: function (): IterableIterator<[string, string]> {
        throw new Error('Function not implemented.');
      },
    }

    type YourContextRequestObject = YourRequestObject<CustomRequestInit>
      & MyContext<UserWithoutSensitiveData>
    
    // usage
    const context: CustomContextType<MyContext> = {
      ...contextProps,
      req: customReq as YourContextRequestObject,
      cookie: customReq.cookie,
      request: customReq.request as YourContextRequestObject,
      ctx: customReq.ctx,
      cache: {} as RequestCache,
      size: 0,
      user: customReq.user as UserWithAccessToken,
      userService: customReq.userService,
      url: customReq.url,
      URLSearchParams: customReq.URLSearchParams,
      // context: customReq.context,
      session: customReq.session as CustomSessionType,
      body: customReq.body,
      currentUser: customReq.currentUser,
     accepts: customReq.accepts,
      config: customReq.config,
      signedCookies: {} as Record<string, string>,
      // userId: customReq.currentUserWithAccessToken,
      token: customReq.token,
      accessToken: customReq.accessToken || null,
      // prismaService: customReq.prismaService,
      // customProp: customReq.customProp,
      cookies: filteredCookies.reduce((acc, cookieString) => {
        const [name, value] = cookieString.split('=')
        return { ...acc, [name.trim()]: value.trim() }
      }, {}),
      get: (name: string) => {
        const value = contextProps[name]
        if (value !== undefined) {
          return value
        } else {
          // Look for the value in the request object
          const reqValue = customReq[name]
          if (reqValue !== undefined) {
            return reqValue
          } else {
            // Value not found
            return undefined
          }
        }
      },
  
    }

    return context
  }
