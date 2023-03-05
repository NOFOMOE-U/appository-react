import { Module } from '@nestjs/common'

import { PrismaModule } from '@appository/backend/data-access'
import { CoreModule } from '@appository/core'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
@Module({
  imports: [CoreModule,
  GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver:ApolloDriver,
      useFactory: (): GqlModuleOptions => ({
        autoSchemaFile: join(process.cwd(), 'libs/backend/data-access/src/graphql/schema.graphql'),
      }),
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
