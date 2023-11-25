import { PrismaService } from '@appository/backend/data-access'
import { CustomRequestWithContext } from '@appository/backend/request-options'
import { UserWithoutSensitiveData } from '@appository/backend/users'
import { PrismaClient } from '@prisma/client'
import { Response } from 'express-serve-static-core'
import { CustomPrismaClient } from 'libs/backend/data-access/src/lib/prisma/prisma'
import { createInitialContext } from './init-context'
import { MyContext } from './my-context'
export interface ContextProps {
  prisma: CustomPrismaClient;
  request: CustomRequestWithContext<MyContext<{}>>;
  response: Response;
  userId: string | null,
  prismaService: PrismaService
}

export class Context {

  private accessToken: string | null = null;
  private prisma: PrismaClient;
  private userId: string | null = null;
  private prismaService: PrismaService
  public currentUser: UserWithoutSensitiveData | null = null;
  public id: string;
  public cookies: Record<string, string> | string | string[] | undefined;
  public token: string | null;
  

  constructor({ prisma, request, response, prismaService }: ContextProps) {
    this.prisma = prisma;
    this.id = request.id ?? '';
    this.cookies = request.cookies;
    this.token = request.token;
    this.prismaService =  prismaService
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAuthorizationHeader() {
    if (!this.accessToken) {
      return {};
    }
    return {
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  getUserId() {
    return this.userId;
  }

  getPrisma() {
    return this.prisma;
  }


  static async create(prisma: PrismaClient, req: CustomRequestWithContext<MyContext<{}>>, response: Response): Promise<Context> {
    const contextType = await createInitialContext(req);
    const userId = contextType.userId ? contextType.userId : null;
    const context = new Context({ prisma, request: req, response, userId, prismaService: new PrismaService });
    if (contextType.accessToken) {
      context.setAccessToken(contextType.accessToken);
    }
    return context;
  }
}
