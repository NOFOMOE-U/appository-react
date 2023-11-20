import {
  ContextService,
  createContext
} from '@appository/backend/context-system'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { configuration } from './config/configuration'
import { validationSchema } from './config/validation'
import { CoreResolver } from './core.resolver'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      debug: true,
      playground:true,
      context: createContext
    }),
    // ContextModule, removing
  ],
  controllers: [],
  providers: [CoreResolver],
  exports: [ ContextService //adding
],
})
export class CoreModule {}
