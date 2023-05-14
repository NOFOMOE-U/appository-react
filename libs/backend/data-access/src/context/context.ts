import { PrismaClient } from '@prisma/client'
import { Response } from 'express'
import { CustomRequestWithContext } from '../make-api/custom-request-with-context'
import { UserWithoutSensitiveData } from '../modules/user/user'
import { createInitialContext } from './init-context'
import { MyContext } from './my-context'
export interface ContextProps {
  prisma: PrismaClient;
  request: CustomRequestWithContext<MyContext<{}>>;
  response: Response;
  userId: string | null, 
}

export class Context {
  private accessToken: string | null = null;
  private prisma: PrismaClient;
  private userId: string | null = null;
  public currentUser: UserWithoutSensitiveData | null = null;
  public id: string;
  public cookies: Record<string, string> | string | string[] | undefined;
  public token: string | null;

  constructor({ prisma, request, response }: ContextProps) {
    this.prisma = prisma;
    this.id = request.id ?? '';
    this.cookies = request.cookies;
    this.token = request.token;
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

  async getUser() {
    if (!this.userId) {
      return null;
    }
    if (!this.currentUser) {
      this.currentUser = await this.getUserById(this.userId.toString());
    }
    return this.currentUser;
  }
  

  static async create(prisma: PrismaClient, req: CustomRequestWithContext<MyContext<{}>>, response: Response): Promise<Context> {
    const contextType = await createInitialContext(req);
    const userId = contextType.userId ? contextType.userId : null;
    const context = new Context({ prisma, request: req, response, userId });
    if (contextType.accessToken) {
      context.setAccessToken(contextType.accessToken);
    }
    return context;
  }
}
