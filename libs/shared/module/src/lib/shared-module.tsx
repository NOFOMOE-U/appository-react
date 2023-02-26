import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AbstractGraphQLDriver, GraphQLModule } from '@nestjs/graphql';

  @Module({
    imports: [
      GraphQLModule.forRoot({
        debug: true,
        playground: true,
        driver: ApolloDriver,
        imports: [
          HttpAdapterHost,
          AbstractGraphQLDriver,
          ApolloDriver,
        ],
      }),
    ],
    exports: [GraphQLModule],
  })

  export class SharedDataModule {}
