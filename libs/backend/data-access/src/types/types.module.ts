import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { LazyTypeRegistry } from '../lazytyperegistry'
import { UserModule } from '../modules/user/user.module'
import { TypesService } from './types.service'

@Module({
  imports: [
  GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver:ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: 'schema.gql',
        context: ({ req }) => ({ req }),
        typePaths: ['./src/**/*.graphql'],
        installSubscriptionHandlers: true,
      }),
    }),
    UserModule,
    LazyTypeRegistry,
  ],
  providers: [TypesService],
  exports:[TypesService, LazyTypeRegistry]
})
export class TypesModule {}
