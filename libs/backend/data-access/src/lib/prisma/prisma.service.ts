import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export interface PrismaContext{
  prisma: PrismaClient
}

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  async getContext() {
    return { prisma: this.prisma };
  }
  

}

export const getContext = async (): Promise<PrismaContext> => {
  const prismaService = new PrismaService();
  const prisma = await prismaService.getContext();
  return prisma
}
