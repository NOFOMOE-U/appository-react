//backend/data-access/src/prisma/prisma.module
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Module({
  providers: [
    PrismaService,
    // { provide: "PRISMA_CLIENT", useValue: prisma } removed
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
