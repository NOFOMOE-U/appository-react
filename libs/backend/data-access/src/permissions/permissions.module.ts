import { Module } from '@nestjs/common';
import { PermissionsMiddleware } from './permissions.middleware';

@Module({
  providers: [PermissionsMiddleware],
  exports: [PermissionsMiddleware],
})
export class PermissionsModule {}
