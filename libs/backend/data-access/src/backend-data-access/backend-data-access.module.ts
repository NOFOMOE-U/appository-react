import { ContextService } from '@appository/backend/data-access'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '../graphql/graphql.module'
import { BackendDataModelModule } from '../lib/backend-data-model'
import { PrismaService } from '../lib/prisma/prisma.service'
import { BackendDataAccessService } from './backend-data-access.service'

@Module({
  imports: [GraphQLModule],
  providers: [PrismaService, BackendDataAccessService, BackendDataModelModule, ContextService],
  exports: [PrismaService, BackendDataAccessService, BackendDataModelModule, ContextService],
})
export class BackendDataAccessModule {
  providers!: any[];  // use non-null assertion operator
  constructor() {}

}
