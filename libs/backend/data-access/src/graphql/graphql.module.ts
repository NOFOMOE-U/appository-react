import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'
import { GraphQLConfigService } from '../../../../../apps/backend/api/src/app/gql.config'
import { PrismaModule } from '../lib/prisma.module'
import { PrismaService } from '../lib/prisma.service'
@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    NestGraphQLModule.forRootAsync({
      useClass: GraphQLConfigService,
      inject: [ConfigService, PrismaService],
    }),
  ],
  exports: [NestGraphQLModule],
})
export class GraphqlModule {}
