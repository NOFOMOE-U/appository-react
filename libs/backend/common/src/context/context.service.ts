import { CustomRequest, PrismaService } from '@appository/backend/data-access'
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { User } from 'libs/backend/data-access/src/node_modules/.prisma/client'

@Injectable()
export class ContextService {
  constructor(private readonly prismaService: PrismaService) {}

  async createContext(request: CustomRequest): Promise<{prisma: PrismaClient, user: User}> {
    const prisma = this.prismaService.getPrismaClient()
    const user = await prisma.user.findUnique({
      where: { email: request.user?.email },
    })
    return { prisma,user }
  }
}
