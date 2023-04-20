//libs/backend/data-access/src/graphql/graphql.module.ts
import {
  BackendAuthModule,
  BackendDataModelModule,
  CommonContextModule,
  ContextService,
  PrismaClient,
  PrismaModule,
  createCustomContextWithRequest,
} from '@appository/backend/data-access'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GqlModuleOptions, GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BackendDataModelModule,
    CommonContextModule,
    PrismaModule,
    BackendAuthModule,
    // BackendCommonModule, // Moved the import here
  ],
})
export class GraphQLModule {}

@Module({
  imports: [
  NestGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService, contextService: ContextService): GqlModuleOptions => ({
        autoSchemaFile: join(process.cwd(), 'libs/backend/data-access/src/graphql/schema.graphql'),
        context: ({ req }: { req: any }) => {
          const prisma = new PrismaClient()

          const createContext = createCustomContextWithRequest(prisma, {
            id: '',
            userId: '',
            request: req,
            customProp: '',
            currentUser: null,
            ctx: {},
            prisma: new PrismaClient(),
            token: null,
            accessToken: null,
          }) as unknown as () => { prisma: PrismaClient; currentUser: any }

          const context = createContext()
          const { currentUser } = context

          return { prisma, currentUser }
        },
      }),
      inject: [ConfigService, ContextService],
    }),
  ],
  exports: [NestGraphQLModule],
})
export class AppGraphQLModule {}
