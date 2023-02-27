import { Module } from '@nestjs/common'
import { PrismaClient } from 'libs/backend/data-access/src/node_modules/.prisma/client'
import { UserController } from './user.controller'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

const prisma = new PrismaClient()

@Module({
  providers: [
    UserService,
    UserResolver,
    {
      provide: 'PRISMA_CLIENT',
      useValue: prisma,
    },
  ],

  controllers: [UserController],
})
export class UserModule {}
