//libs/backend/data-access/src/graphql/graphql.module.ts
import { ContextModule } from '@appository/backend/common';
import { BackendDataModelModule, CustomRequest } from '@appository/backend/data-access';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ContextService } from 'libs/backend/common/src/context/context.service';
import { join } from 'path';
import { PrismaModule } from '../lib/prisma/prisma.module';
@Module({
  imports: [
  ConfigModule,
    BackendDataModelModule,
    PrismaModule,
    ContextModule,
    NestGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService, contextService: ContextService): GqlModuleOptions => ({
        autoSchemaFile: join(process.cwd(), 'libs/backend/data-access/src/graphql/schema.graphql'),
        context: async ({ req }: { req: CustomRequest }) => {
          const { prisma, user } = await contextService.createContext(req);
          return { prisma, user };
        },
      }),
      inject: [
        ConfigService,
        ContextService
      ]
    }),
  ],
  exports: [
    NestGraphQLModule,
  ],
})
export class GraphqlModule {}
