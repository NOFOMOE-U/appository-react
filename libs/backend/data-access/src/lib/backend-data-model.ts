//backend/data-access/src/lib/backend-data-model.module.ts
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaClient } from 'libs/backend/data-access/src/node_modules/.prisma/client'
import { join } from 'path'
import { ContextModule } from '../context/context.module'
import { UserModule } from '../modules/user/user.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  providers: [PrismaClient],
  imports: [
ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        autoSchemaFile: join(process.cwd(), 'apps/backend/src/schema.gql'),
        debug: true,
        playground: true,
      }),
    }),
    PrismaModule,
    UserModule,
    // PostModule,
    ContextModule, // <-- add this line
  ],
  exports: ['PrismaClient'],
})
export class BackendDataModelModule {}
