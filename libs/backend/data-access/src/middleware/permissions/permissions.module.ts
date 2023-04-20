import { DynamicModule, Injectable, MiddlewareConsumer, Module } from '@nestjs/common'
import { LoggingMiddleware } from '../logging/logging.middleware'
import { PermissionsController } from './permissions.controller'
import { PermissionsMiddleware } from './permissions.middleware'
import { PERMISSIONS_ENABLED, PERMISSIONS_MODULE_OPTIONS, PermissionsModuleAsyncOptions } from './permissions.types'

@Module({
  imports: [
    // SharedDataModule
  ],
  controllers:[PermissionsController],
  providers: [PermissionsMiddleware],
  exports: [PermissionsMiddleware],
})
@Injectable()
export class PermissionsModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PermissionsMiddleware).forRoutes('*')
    consumer.apply(LoggingMiddleware).forRoutes('*')
  }

  static forRootAsync(options: PermissionsModuleAsyncOptions): DynamicModule {
    return {
      module: PermissionsModule,
      imports: options.imports,
      providers: [
        {
          provide: PERMISSIONS_MODULE_OPTIONS,
          useFactory: options.useFactory || (() => ({})),
          inject: options.inject || []
        },
        PermissionsMiddleware,
      ],
    }
  }

  static forRoot(permissionsEnabled: boolean): DynamicModule {
    return {
      module: PermissionsModule,
      providers: [
        {
          provide:   PERMISSIONS_ENABLED,
          useValue: permissionsEnabled,
        },
        PermissionsMiddleware,
      ],
      exports: [PermissionsMiddleware],
    }
  }
}
