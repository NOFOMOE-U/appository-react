import { ContextModule } from '@appository/backend/common';
import { PermissionsModule } from '@appository/backend/data-access';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }), 
    HttpAdapterHost,
    PermissionsModule,
    ContextModule
  ],
  
  providers: [ContextModule ],
  exports: [GraphQLModule]
})

export class SharedDataModule {}