//backend/data-access/src/lib/backend-data-model.module.ts
import { ContextModule } from '@appository/backend/common'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Injectable, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaClient } from 'libs/backend/data-access/src/node_modules/.prisma/client'
import { join } from 'path'
import { UserModule } from '../modules/user/user.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  providers: [ PrismaClient],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        autoSchemaFile: join(process.cwd(), 'libs/backend/data-access/src/schema.gql'),
        debug: true,
        playground: true,
      }),
    }),
    PrismaModule,
    UserModule,
    // PostModule,
    ContextModule, // <-- add this line
  ],
  exports: ['PrismaClient'],//changed based on dev/graphql, from PrismaService to PrismaClient
})
@Injectable()
export class BackendDataModelModule {
  // public static prismaService: PrismaService;

  // constructor(private readonly _prismaService: PrismaService) {
  //   BackendDataModelModule.prismaService = _prismaService;
  // }
}





