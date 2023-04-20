import { Controller, Get, Inject, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaContext } from '../../interfaces/prisma/prisma.interface';
import { CustomRequest } from '../../interfaces/user/custom-request';
@Controller('prisma')
export class PrismaController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getContext(req: CustomRequest, prisma: PrismaClient): Promise<PrismaContext> {
    const context = await this.getContext(req, prisma)
    return context
  }

  @Get('/users')
  async getAllUsers(@Req() req: CustomRequest, @Inject('PrismaClient')prisma: PrismaClient) {
    const context = await this.getContext(req, prisma);
    return context.getPrisma().user.findMany();
  }

  @Get('/posts')
  async getPosts(@Req() req: CustomRequest,@Inject('PrismaClient') prisma: PrismaClient) {
    const context = await this.getContext(req, prisma);
    return context.getPrisma().post.findMany();
  }

  // Add more methods to handle other Prisma queries or mutations
}
