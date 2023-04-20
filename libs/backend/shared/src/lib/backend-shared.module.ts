import { Module } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';

//1, 1,2,8  17  dif 3,2 ,2, 1 37
// task.service, schema.prisma, validateTask, types.ts 

//not needed; assignedToId String? [assignedToId]; yup.string(), assignedToId: null; task.assignedToId
@Module({
  imports: [GraphQLModule],
providers: [
    HttpAdapterHost
  ],
  exports: [
    
  ],
})
export class BackendSharedModule {}
