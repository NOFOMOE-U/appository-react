import { CustomRequest, UserWithAccessToken, UserWithoutSensitiveData, YourRequestObject } from '@appository/backend/data-access'
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import type { Request } from 'express'
import { CustomRequestInit } from '../make-api/requests/custom-request-init'
import { getUserById } from '../modules/user/user-queries/get-user-by-id'
import { CustomURLSearchParams, MyContext } from './my-context'
@Injectable()
export class ContextService {
  constructor(private readonly context: MyContext, private readonly req: CustomRequest<MyContext<{}>>) {}

  async createContext(prisma: PrismaClient, req: CustomRequest<MyContext<{}>>): Promise<MyContext> {
    const customRequest = Object.assign(req, {
      currentUser: {},
    }) as CustomRequest<MyContext<{}>>

      const context: MyContext<{}> = {
        prisma,
        request: {} as YourRequestObject<CustomRequestInit>,
        url: '',
        user: {} as UserWithAccessToken,
        currentUser: this.req.currentUser && 'accessToken' in this.req.currentUser
        ? (this.req.currentUser as unknown as UserWithAccessToken)
        : (this.req.currentUser as UserWithoutSensitiveData),
        userId: this.req.userId,
        userService: this.req.userService,
        get: this.req.get,
        body: this.req.body,
        requestBody: this.req.requestBody,
        cache: this.req.cache,
        token: this.req.token,
        config: this.req.config,
        context: this.req.context,
        ctx: this.req.context.ctx,
        session: this.req.session,
        cookies: this.req.cookies,
        signedCookies: this.req.signedCookies as unknown as Record<string, string>,
        accessToken: this.req.accessToken as string,
        size: 0,
        accepts: (types: string | string[] | undefined) => {
          if (typeof types === 'string') {
            return [types]
          } else if (Array.isArray(types)) {
            return types
          } else {
            return []
          }
        },
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
        forEach: function (callback: (value: string, name: string, parent?: Headers | CustomURLSearchParams | undefined) => void): void {
          throw new Error('Function not implemented.')
        },
        delete: function (name: string): void {
          throw new Error('Function not implemented.')
        },
        getAll: function (name: string[]): string[] {
          throw new Error('Function not implemented.')
        },
        URLSearchParams: {} as CustomURLSearchParams,
        [Symbol.iterator]: function (): IterableIterator<[string, string]> {
          throw new Error('Function not implemented.')
        }
      }
      return context
    
  }

  async getRequest(): Promise<Request | undefined> {
    if (this.context.session && typeof this.context.session === 'object' /* && this.context.session.request */) {
      return undefined
    }
    return undefined
  }

  async getUserById(userId: string, prisma: PrismaClient): Promise<UserWithoutSensitiveData | null> {
    //user the imported getUserById function
    const user = this.req.currentUser ? await getUserById(userId) : null
    return user
  }
}
