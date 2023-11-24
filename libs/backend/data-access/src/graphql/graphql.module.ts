//libs/backend/data-access/src/graphql/graphql.module.ts
import { ContextService, MyContext } from '@appository/backend/context-system'
import { BackendAuthModule, BackendDataModelModule, PrismaClient, PrismaModule } from '@appository/backend/data-access'

import { CustomURLSearchParams } from '@appository/backend/context-system'
import {
  CustomRequestInitWithGet,
  YourRequestObject,
  createCustomContextWithRequest,
} from '@appository/backend/request-options'
import { UserService, UserWithoutSensitiveData } from '@appository/backend/users'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GqlModuleOptions, GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

import { CustomContextType } from '@appository/backend/context-system'
import { CommonContextModule } from '../common-context/common-context.module'
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
let user: UserWithoutSensitiveData

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
            url: '',
            size: 0,
            user,
            userService: {} as UserService,
            request: {} as YourRequestObject<CustomRequestInitWithGet>,
            body: undefined,
            requestBody: undefined,
            accessToken: null,
            signedCookies: {} as Record<string, string>,
            URLSearchParams: {} as CustomURLSearchParams,
            ctx: {} as CustomContextType<MyContext>,

            session: {
              user,
              currentUser: req.headers.authorization,
              userId: req.headers.authorization ? req.headers.authorization.split('Bearer ')[1] : null,
              username: req.headers.authorization ? req.headers.authorization.split('Bearer ')[1] : user?.username,
              expires: 0,
              yourSessionKey: 'sessionKey',
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
            forEach: function (
              callback: (value: string, name: string, parent?: Headers | CustomURLSearchParams | undefined) => void,
            ): void {
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
            },
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
