import { PrismaClient } from '@prisma/client'
import { Response } from 'express'
import { UserWithoutSensitiveData } from '../modules/user/user'
import { CustomRequestWithContext } from './custom-request-with-context'
import { createInitialContext } from './init-context'

export class Context {
  private accessToken: string | null = null
  private prisma: PrismaClient
  private userId: number | null = null
  public currentUser: UserWithoutSensitiveData | null = null

  constructor(
    prisma: PrismaClient,
    private readonly request: CustomRequestWithContext,
    private readonly response: Response,
  ) {
    this.prisma = prisma
  }

  async getUserById(userId: string): Promise<UserWithoutSensitiveData | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })
    return user
  }

  setAccessToken(token: string) {
    this.accessToken = token
  }

  getAuthorizationHeader() {
    if (!this.accessToken) {
      return {}
    }
    return {
      Authorization: `Bearer ${this.accessToken}`,
    }
  }

  getUserId() {
    return this.userId
  }

  getPrisma() {
    return this.prisma
  }

  getUser() {
    if (!this.userId) {
      return null
    }
  }

  static async create(prisma: PrismaClient, req: CustomRequestWithContext, response: Response): Promise<Context> {
    const contextType = await createInitialContext(prisma, req)
    const context = new Context(prisma, req, response)
    context.userId = contextType.userId ?? null
    context.currentUser = contextType.currentUser
    if (contextType.accessToken) {
      context.setAccessToken(contextType.accessToken)
    }
    return context
  }
}
// #todo check if init-context and this context file are in sync with one another
