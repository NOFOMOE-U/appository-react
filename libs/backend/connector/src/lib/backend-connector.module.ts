import { Module } from '@nestjs/common';
import { ConnectorService } from '../connector/connector.service';

@Module({
  controllers: [],
  imports:[],
  providers: [ConnectorService],
  exports: [ConnectorService],
})
export class BackendConnectorModule {}
