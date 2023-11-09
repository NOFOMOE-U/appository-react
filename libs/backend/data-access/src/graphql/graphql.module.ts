//libs/backend/data-access/src/graphql/graphql.module.ts
import {
  BackendAuthModule,
  BackendDataModelModule,
  CommonContextModule,
  ContextService,
  CustomURLSearchParams,
  PrismaClient,
  PrismaModule,
  createCustomContextWithRequest
} from '@appository/backend/data-access';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BackendDataModelModule,
    CommonContextModule,
    PrismaModule,
    BackendAuthModule,
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
            userId: req.params.user.id,
            request: req.params.user.request,
            ctx: req.params.user.ctx,
            prisma,
            user: req.params.user,
            userService: req.params.user.userService,
            body: req.params.user.body,
            requestBody: req.params.user.requestBody,
            accessToken: null,
            url: '',
            signedCookies: {} as Record<string, string>,
            URLSearchParams: {} as CustomURLSearchParams,
            size: 0,
            session: {
              userId: req.session.user.id,
              username: req.session.user.username,
              currentUser: req.session.isAuthenticatedUser,
              expires: 0,
              user: req.session.user.expirationTime,
              yourSessionKey: req.session.user.yourSessionKey,
            },
            entries: function (): IterableIterator<[string, string]> {
              throw new Error('Function not implemented.')
            },
            keys: function (): IterableIterator<string> {
              throw new Error('Function not implemented.')
            },
            values: function (): IterableIterator<string> {
              throw new Error('Function not implemented.')
            },
            append: function (key: string, value: string): void {
              throw new Error('Function not implemented.')
            },
            has: function (key: string): boolean {
              throw new Error('Function not implemented.')
            },
            set: function (key: string, value: string): void {
              throw new Error('Function not implemented.')
            },
            sort: function (key: string, value: string): void {
              throw new Error('Function not implemented.')
            },
            forEach: function (callback: (value: string, name: string, parent?: Headers | CustomURLSearchParams | undefined) => void): void {
              throw new Error('Function not implemented.')
            },
            delete: function (name: string): void {
              throw new Error('Function not implemented.')
            },
            getAll: function (name: string[]): string[] {
              throw new Error('Function not implemented.')
            },
            accepts: function (types: string | string[] | undefined): (string | false | null)[] | undefined {
              throw new Error('Function not implemented.')
            },
            [Symbol.iterator]: function (): IterableIterator<[string, string]> {
              throw new Error('Function not implemented.')
            }
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
