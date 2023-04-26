import { PrismaClient } from '@prisma/client'
import { Response } from 'express'
import { UserWithoutSensitiveData } from '../modules/user/user'
import { CustomRequestWithContext } from './custom-request-with-context'
import { createInitialContext } from './init-context'
import { MyContext } from './mycontext'
export interface ContextProps {
  prisma: PrismaClient;
  request: CustomRequestWithContext<MyContext>;
  response: Response;
}

export class Context {
  private accessToken: string | null = null;
  private prisma: PrismaClient;
  private userId: number | null = null;
  public currentUser: UserWithoutSensitiveData | null = null;
  public id: string;
  public cookies: string | string[] | undefined;
  public token: string | null;

  constructor({ prisma, request, response }: ContextProps) {
    this.prisma = prisma;
    this.id = request.context.id;
    this.cookies = request.cookies;
    this.token = request.context.token;
  }

  async getUserById(userId: string): Promise<UserWithoutSensitiveData | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, roles: true, name: true, createdAt: true, updatedAt: true, userProfileId: true},
    });
    return user;
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

  getUser() {
    if (!this.userId) {
      return null;
    }
  }

  static async create(prisma: PrismaClient, req: CustomRequestWithContext<MyContext>, response: Response): Promise<Context> {
    const contextType = await createInitialContext(req);
    const context = new Context({ prisma, request: req, response });
    context.userId = contextType.userId ? Number(contextType.userId) : null;
    context.currentUser = contextType.currentUser ?? null;
    if (contextType.accessToken) {
      context.setAccessToken(contextType.accessToken);
    }
    return context;
  }
}
