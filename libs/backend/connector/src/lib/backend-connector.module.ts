import { ContextService } from '@appository/backend/context-system';
import { Module } from '@nestjs/common';
import { ConnectorService } from '../connector/connector.service';

@Module({
  controllers: [],
  imports:[ContextService],
  providers: [ConnectorService],
  exports: [ConnectorService],
})
export class BackendConnectorModule {}
