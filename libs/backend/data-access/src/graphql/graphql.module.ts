import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
// import { GraphQLConfigService } from '../../../../../apps/backend/api/src/app/gql.config'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from '../lib/prisma/prisma.module';
import { PrismaService } from '../lib/prisma/prisma.service';
@Module({
  imports: [
  ConfigModule,
    PrismaModule,
    NestGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (): GqlModuleOptions => ({
        autoSchemaFile: join(process.cwd(), 'libs/backend/data-access/src/graphql/schema.graphql'),
        context: ({ req }) => ({ req, prisma: PrismaService }),    
      }),
      inject: [ConfigService, PrismaService],
    }),
  ],
  exports: [NestGraphQLModule],
})
export class GraphqlModule {}
