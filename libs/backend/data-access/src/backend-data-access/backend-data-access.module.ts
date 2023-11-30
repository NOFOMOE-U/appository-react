import { Module } from '@nestjs/common'
//todo aqua
// import { AquaModule } from '../../../communication/src/aqua/aqua.module'
import { GraphQLModule } from '../graphql/graphql.module'
import { BackendDataModelModule } from '../lib/backend-data-model'
import { PrismaService } from '../lib/prisma/prisma.service'
import { BackendDataAccessService } from './backend-data-access.service'
// import { AquaService } from '@appository/backend/communication'

@Module({
  imports: [GraphQLModule,

  ],
providers: [PrismaService, BackendDataAccessService, BackendDataModelModule  ],
  exports: [PrismaService, BackendDataAccessService, BackendDataModelModule ]
})
export class BackendDataAccessModule {
  providers!: any[];  // use non-null assertion operator
  constructor(
    private readonly prismaService: PrismaService,
    private readonly backendDataAccessModule: BackendDataAccessModule,
    // private readonly aquaModule: AquaService
  ) { }
  establishConnection(): void {
    
    this.prismaService.onModuleInit()
  }

}
