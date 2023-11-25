import { BackendDataAccessModule } from '@appository/backend/data-access';
import { BackendRequestOptionsModule } from '@appository/backend/request-options';
import { BackendUsersModule } from '@appository/backend/users';
import { SharedFeaturesDocumentsModule } from '@appository/shared-features/documents';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BackendDataAccessModule,
    BackendUsersModule,
    SharedFeaturesDocumentsModule,
    BackendRequestOptionsModule,
  ],
  controllers: [],
  providers: [],
  exports: [
    BackendDataAccessModule,
    BackendUsersModule,
    SharedFeaturesDocumentsModule,
    BackendRequestOptionsModule,
  ],
})
export class SharedServicesHubModule {}
