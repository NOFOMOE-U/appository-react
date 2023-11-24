import { Module } from '@nestjs/common'
import { CreateVersionsController } from './create-versions.controller'
import { CreateVersionsService } from './create-versions.service'

@Module({
  controllers: [CreateVersionsController],
  providers: [CreateVersionsService],
})
export class CreateVersionsModule {}
