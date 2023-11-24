// import { AquaModule } from '@appository/backend/communication';
import { Module } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
// note do not add any modues connected to BackendDataAccess or core as it wi cause circular dependency issues
//use common-modules for extending
@Module({
  imports: [
    GraphQLModule,
  ],
providers: [
    HttpAdapterHost
  ],
  exports: [
    
  ],
})
export class BackendSharedModule {}
