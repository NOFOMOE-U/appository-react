import { ContextModule, createContext } from '@appository/backend/common'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
@Module({
  imports: [
    ContextModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (): GqlModuleOptions => ({
        autoSchemaFile: join(process.cwd(), 'libs/backend/data-access/src/graphql/schema.graphql'),
        context: async () => createContext(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ContextModule],
  exports: [ContextModule],
})
export class AppModule {}
