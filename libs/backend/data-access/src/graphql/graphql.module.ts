//libs/backend/data-access/src/graphql/graphql.module.ts
import { BackendDataModelModule } from '@appository/backend/data-access';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { PrismaModule } from '../lib/prisma/prisma.module';
import { PrismaService } from '../lib/prisma/prisma.service'; //--importing form the backendDataAccss
@Module({
  imports: [
    ConfigModule,
    BackendDataModelModule,
    PrismaModule,
    // PrismaService,// removed while testing
    NestGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (): GqlModuleOptions => ({
        autoSchemaFile: join(process.cwd(), 'libs/backend/data-access/src/graphql/schema.graphql'),
        context: ({req} ) => ({req, prisma: PrismaService})//after
        // context: ({ req }) => ({ req, prisma: BackendDataModelModule.prismaService }),
      }),
      inject: [
        ConfigService,
        PrismaService, //updaed with context//after
      ]
    }),
  ],
  exports: [
    NestGraphQLModule,
    // PrismaService,//after
    // PrismaModule//after
  ],
})
export class GraphqlModule {}
