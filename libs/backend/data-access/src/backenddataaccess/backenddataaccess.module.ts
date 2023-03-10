import { TypesModule } from '@appository/backend/common';
import { Module } from '@nestjs/common';
import { BackendDataAccessService } from './backenddataaccess.service';
@Module({
  imports: [TypesModule],
  providers: [BackendDataAccessService],
  exports: [BackendDataAccessService], // <-- Add BackendDataAccessService to exports
})
export class BackendDataAccessModule {}