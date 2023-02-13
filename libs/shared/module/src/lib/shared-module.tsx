import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AbstractGraphQLDriver, GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      imports: [
        HttpAdapterHost,
        ApolloDriver,
        AbstractGraphQLDriver,
      ],
    }),
  ],
  exports: [GraphQLModule],
})

export class SharedDataModule {}
