import { BackendConnectorModule } from '@appository/backend/connector'
import { Module } from '@nestjs/common'
//todo aqua
// import { AquaModule } from '../../../communication/src/aqua/aqua.module'
import { GraphQLModule } from '../graphql/graphql.module'
import { BackendDataModelModule } from '../lib/backend-data-model'
import { PrismaService } from '../lib/prisma/prisma.service'
import { BackendDataAccessService } from './backend-data-access.service'

@Module({
  imports: [GraphQLModule,

  ],
providers: [PrismaService, BackendDataAccessService, BackendDataModelModule, BackendConnectorModule ],
  exports: [PrismaService, BackendDataAccessService, BackendDataModelModule, BackendConnectorModule ]
})
export class BackendDataAccessModule {
  providers!: any[];  // use non-null assertion operator
  constructor() {}

}
