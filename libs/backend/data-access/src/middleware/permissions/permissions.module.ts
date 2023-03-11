//Users/dixiejones/Development/main-app/appository-react/libs/backend/data-access/src/middleware/permissions/permissions.module.ts
import { DynamicModule, Injectable, MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggingMiddleware } from '../logging/logging.middleware';
import { PermissionsMiddleware } from './permissions.middleware';
import express = require('express')

@Module({
  providers: [PermissionsMiddleware],
  exports: [PermissionsMiddleware],
})
@Injectable()
export class PermissionsModule {
  private readonly permissionsMiddleware: PermissionsMiddleware;

  static forRoot(options: any): DynamicModule{
    return {
      module: PermissionsModule,
      providers: [
        {
          provide: 'OPTIONS',
          useValue: options
        },
        PermissionsMiddleware
      ],
      exports: [PermissionsMiddleware]
    }
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PermissionsMiddleware).forRoutes('*');
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
