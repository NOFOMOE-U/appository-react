import { Injectable } from '@nestjs/common'
// import { ContextModule } from '@appository/backend/context-system';
// import { BackendDataAccessModule, ContextModule } from '@appository/backend/data-access';
// import {
// //     AquaModule,
// //     AquaService
// // } from '@appository/backend/communication';
// import { ContextService } from '@appository/backend/context-system';

@Injectable()
export class ConnectorService {
    
    constructor(
        private readonly contextModule: ContextModule,

        // private readonly backendDataAccessModule: BackendDataAccessModule,
        // private readonly aquaModule: AquaService
    ) { }

    establishConnection(): void {
    // Example: Set a property in ContextModule
    this.contextModule.setConnectionStatus(true);

    // Example: Call a method in BackendendDataAccess
    this.backendDataAccessModule.providers.find(predicate => predicate)

    }
}