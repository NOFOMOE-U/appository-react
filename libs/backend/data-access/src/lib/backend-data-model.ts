// backend-data-model.module.ts
import { Module } from '@nestjs/common'
import { PrismaClient } from 'libs/backend/data-access/src/node_modules/.prisma/client'
@Module({
  providers: [PrismaClient],
  exports: ['PrismaClient'],
})
export class BackendDataModelModule {}
