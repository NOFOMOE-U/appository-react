import { BackendDataAccessModule, ContextModule, PrismaService } from '@appository/backend/data-access';
import { SharedDataModule } from '@appository/shared/module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule,
    ContextModule,
    BackendDataAccessModule,
    SharedDataModule
  ],
  providers: [PrismaService],
  exports: [BackendDataAccessModule,
    PrismaService],
})
export class BackendCommonModule {}
