import { CoreModule } from '@appository/core'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { BooksModule } from '@appository/books/data-query'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { DataSource } from 'typeorm'
@Module({
  imports: [
  CoreModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.gql'],
    }),
    TypeOrmModule.forRoot(),
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private dataSource: DataSource
}
