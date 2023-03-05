import { Module } from '@nestjs/common';
import { TypesModule } from '../types/types.module';
import { BackendDataAccessService } from './backenddataaccess.service';
@Module({
  imports: [TypesModule],
  providers: [BackendDataAccessService],
  exports: [BackendDataAccessService], // <-- Add BackendDataAccessService to exports
})
export class BackendDataAccessModule {}