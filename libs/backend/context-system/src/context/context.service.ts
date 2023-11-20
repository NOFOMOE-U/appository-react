import { CustomRequest, UserWithAccessToken, UserWithoutSensitiveData, YourRequestObject } from '@appository/backend/data-access'
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import type { Request } from 'express-serve-static-core'
import { CustomRequestInit } from 'libs/backend/data-access/src/make-api/requests/custom-request-init'
import { getUserById } from 'libs/backend/data-access/src/modules/user/user-queries/get-user-by-id'
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
          return this.req.url.split('&').map(p => p.split('=')).entries()
        },
        keys: function (): IterableIterator<string> {
          return this.req.url.split('&').map(p => p.split('=')[0]).values()
        },
        values: function (): IterableIterator<string> {
          return this.req.url.split('&').map(p => p.split('=')[1]).values()
        },
        append: function (key: string, value: string): void {
          this.req.url += `&${key}=${value}`
        },
        has: function (key: string): boolean {
          return this.req.url.includes(`&${key}=`)
        },
        set: function (key: string, value: string): void {
          this.req.url = this.req.url.replace(new RegExp(`(&${key}=)[^&]*`), `$1${value}`)
        },
        sort: function (key: string, value: string): void {
          this.req.url = this.req.url.split('&').sort((a, b) => {
            if (a.startsWith(key) && b.startsWith(key)) {
              return value === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
            }
            return a.localeCompare(b)
          }).join('&')
        },
        forEach: function (callback: (value: string, name: string, parent?: Headers | CustomURLSearchParams | undefined) => void): void {
          this.req.url.split('&').forEach(p => {
            const [name, value] = p.split('=')
            callback(value, name, this)
          })
        },
        delete: function (name: string): void {
         this.req.url = this.req.url.replace(new RegExp(`(&${name}=)[^&]*`), '')
        },
        getAll: function (name: string[]): string[] {
          return name.map(n => this.req.url.split('&').find(p => p.startsWith(`&${n}=`))?.split('=')[1])
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
