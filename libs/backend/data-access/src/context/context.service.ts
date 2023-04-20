  import { UserWithoutSensitiveData, getUserById } from '@appository/backend/data-access';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { Request } from 'express';
import { createContext } from './create-context';
import { CustomRequestWithContext } from './custom-request-with-context';
import { MyContext } from './mycontext';
  @Injectable()
  export class ContextService {
    constructor(private readonly context: MyContext){}

    async createContext(req: CustomRequestWithContext, prisma: PrismaClient): Promise<MyContext> {
      return createContext(prisma, req)
    }

    async getRequest(): Promise<Request> {
      return this.context.request
    }

    async getUserById(userId: string, prisma: PrismaClient): Promise<UserWithoutSensitiveData | null> {
      //user the imported getUserById function
      const user = this.context.currentUser ? await getUserById(userId, prisma) || null : null
      return user
    }
  }
