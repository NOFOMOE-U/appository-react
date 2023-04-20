  import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { TypesService } from './types.service'
  @Module({
    imports: [
      GraphQLModule.forRootAsync<ApolloDriverConfig>({
        driver: ApolloDriver,
        useFactory: () => ({
          autoSchemaFile: join(process.cwd(), 'libs/backend/data-access/src/graphql/schema.graphql'),
          context: ({ req }) => ({ req }),
          typePaths: ['./src/**/*.graphql'],
          installSubscriptionHandlers: true,
        }),
      }),
    ],
    providers: [TypesService],
    exports: [TypesService],
  })
  export class TypesModule {}
