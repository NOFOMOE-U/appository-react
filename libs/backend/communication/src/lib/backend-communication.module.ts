// import {
//     // BackendDataAccessModule,
//   ContextService,
//     PrismaService
//   } from "@appository/core"
  
// import { ConnectorService } from "@appository/backend/connector"
import { Module } from '@nestjs/common'
@Module({
  imports: [
    // BackendDataAccessModule,
    // other necessary imports
  ],



  controllers: [
    // controllers
  ],
  providers: [
    // providers
    // ContextService,
    // PrismaService
  ],
  exports: [
    // ContextService,
    // PrismaService
  ]
})
export class CommunicationModule {
  // constructor(private readonly contextService: ContextService) {}
}
