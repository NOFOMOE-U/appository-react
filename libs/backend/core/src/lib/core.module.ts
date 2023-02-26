import { SharedDataModule } from '@appository/shared/module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaClient } from 'libs/backend/data-access/src/node_modules/.prisma/client'
import { configuration } from './config/configuration'
import { validationSchema } from './config/validation'
import { CoreController } from './core.controller'
import { CoreResolver } from './core.resolver'
import { CoreService } from './core.service'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      autoSchemaFile: true,
    }),
    SharedDataModule,
    PrismaClient
  ],
  controllers: [CoreController],
  providers: [CoreResolver, CoreService],
  exports: [GraphQLModule,PrismaClient],
})
export class CoreModule {}
