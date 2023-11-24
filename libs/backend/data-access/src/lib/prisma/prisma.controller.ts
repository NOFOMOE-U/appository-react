import { CustomRequest } from '@appository/backend/request-options';
import { Controller, Get, Inject, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaContext } from '../../interfaces/prisma/prisma.interface';
import { PrismaService } from './prisma.service';
@Controller('prisma')
export class PrismaController {
  
  constructor(
    private readonly prismaService: PrismaService
    ) {}

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
  async getContext(req: CustomRequest, prisma: PrismaClient): Promise<PrismaContext> {
    const context = await this.getContext(req, prisma)
    return context
  }

  // Add more methods to handle other Prisma queries or mutations
}
