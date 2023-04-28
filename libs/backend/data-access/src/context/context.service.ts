import { UserWithoutSensitiveData, getUserById } from '@appository/backend/data-access';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { Request } from 'express';
import { CustomRequestWithAllProps } from './custom-request-with-context';
import { MyContext } from './mycontext';
  @Injectable()
  export class ContextService {
    constructor(
      private readonly context: MyContext,
      private readonly req: CustomRequestWithAllProps<MyContext<{}>>
    ) {}

    async createContext(prisma: PrismaClient, req: CustomRequestWithAllProps<MyContext<{}>>): Promise<MyContext> {
      const customRequest = Object.assign(req, {
        currentUser: {}
      }) as CustomRequestWithAllProps<MyContext<{}>>

      const context: MyContext<{}> = {
        prisma,
        req: this.req,
        request: this.req,
        body: this.req.body,
        cache: this.req.cache,
        token: this.req.token,
        userId: this.req.userId,
        session: this.req.session,
        cookies: this.req.cookies,
        accessToken: this.req.accessToken,
        credentials: this.req.credentials,
      }
      return context
    }

    async getRequest(): Promise<Request> {
      return this.context.request
    }

    async getUserById(userId: string, prisma: PrismaClient): Promise<UserWithoutSensitiveData | null> {
      //user the imported getUserById function
      const user = this.req.currentUser ? await getUserById(userId) : null;
      return user
    }
  }
