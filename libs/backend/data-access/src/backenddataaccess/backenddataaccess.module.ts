import { BackendCommonModule, TypesModule } from '@appository/backend/common';
import { Injectable, Module } from '@nestjs/common';
import { BackendDataAccessService } from './backenddataaccess.service';
@Module({
imports: [TypesModule, BackendCommonModule],
  providers: [BackendDataAccessService],
  exports: [BackendDataAccessService], // <-- Add BackendDataAccessService to exports
})
@Injectable()
export class BackendDataAccessModule {}