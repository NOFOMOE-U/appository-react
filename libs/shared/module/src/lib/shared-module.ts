import { AquaModule } from '@appository/backend/communication';
import {
  PermissionsModule,
  PermissionsModuleOptions,
  PrismaService
} from '@appository/backend/data-access';

import { Module } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  PERMISSIONS_MODULE_OPTIONS,
  PermissionsModuleOptionsFactory
} from 'libs/backend/data-access/src/middleware/permissions/permissions.types';
class PermissionsModuleConfig implements PermissionsModuleOptionsFactory {
  createPermissionsModuleOptions(): PermissionsModuleOptions | Promise<PermissionsModuleOptions> {
    return {
      basePath: '/api',
      [Symbol.iterator]: () => {
        return {
          next: () => {
            return {
              done: true,
              value: undefined,
            };
          },
        };
      },
    };
  }
}

@Module({
  imports: [
    HttpAdapterHost,
    PermissionsModule.forRootAsync({
      useClass: PermissionsModuleConfig,
    }),
    //todo aqua
    AquaModule,
  ],
  providers: [
    PrismaService,
    {
      provide: PERMISSIONS_MODULE_OPTIONS,
      useValue: {
        basePath: '/permissions',
        roles: [],
      } as PermissionsModuleOptions,
    },
    HttpAdapterHost,
  ],
  exports: [PermissionsModule],
})
export class SharedDataModule {}
