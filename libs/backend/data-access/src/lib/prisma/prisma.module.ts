//backend/data-access/src/prisma/prisma.module
import { Module } from '@nestjs/common';
import { PrismaClient } from 'libs/backend/data-access/src/node_modules/.prisma/client';
import { PrismaService } from './prisma.service';
@Module({
  providers: [
    {
      provide: 'PRISMA_CLIENT',
      useValue: new PrismaClient(),
    },
    PrismaService
  ],
  exports: [
    PrismaService
  ],
})
export class PrismaModule {}
