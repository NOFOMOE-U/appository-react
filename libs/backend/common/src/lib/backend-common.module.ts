import { AquaModule, AquaService } from '@appository/backend/communication';
import { ContextModule } from '@appository/backend/context-system';
import { BackendDataAccessModule, PrismaService } from '@appository/backend/data-access';
import { SharedDataModule } from '@appository/shared/module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule,
    ContextModule,
    BackendDataAccessModule,
    SharedDataModule,
  ],
  providers: [PrismaService, AquaService],
  exports: [BackendDataAccessModule,
    PrismaService, AquaModule],
})
export class BackendCommonModule {}
