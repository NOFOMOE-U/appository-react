import { CustomRequest, UserWithoutSensitiveData, YourRequestObject, getUserById } from '@appository/backend/data-access'
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import type { Request } from 'express'
import { CustomRequestInit } from '../make-api/requests/custom-request-init'
import { MyContext, UserWithAccessToken } from './my-context'
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
      currentUser:
        this.req.currentUser && 'accessToken' in this.req.currentUser
          ? (this.req.currentUser as unknown as UserWithAccessToken)
          : (this.req.currentUser as UserWithoutSensitiveData),
      get: this.req.get,
      body: this.req.body,
      cache: this.req.cache,
      token: this.req.token,
      userId: this.req.userId,
      context: this.req.context,
      ctx: this.req.context.ctx,
      session: this.req.session,
      cookies: this.req.cookies,
      accessToken: this.req.accessToken as string,
      signedCookies: this.req.signedCookies as unknown as Record<string, string>,
      config: this.req.config,
      accepts: (types: string | string[]) => {
        if (typeof types === 'string') {
          return [types]
        } else if (Array.isArray(types)) {
          return types
        } else {
          return []
        }
      },
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
