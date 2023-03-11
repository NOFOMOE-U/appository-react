//Users/dixiejones/Development/main-app/appository-react/libs/backend/data-access/src/permissions/permissions.middleware.ts
// import { MiddlewareFn } from 'type-graphql';
import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class PermissionsMiddleware implements NestMiddleware {
  static createMiddleware() {
    return async (req: Request, _: Response, next: NextFunction) => {
      // Your middleware logic here
      next()
    }
  }

  async use(req: Request, _: Response, next: NextFunction) {
    console.log(`Request - ${req.method} ${req.originalUrl}`)
    next()
  }
}




// import { Injectable,  } from '@nestjs/common';
// import { Injectable, NestMiddleware } from '@nestjs/common';

// @Injectable()
// export class LoggingMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     next();
//   }
// }



// import { LoggingMiddleware } from './logging.middleware';

// describe('LoggingMiddleware', () => {
//   it('should be defined', () => {
//     expect(new LoggingMiddleware()).toBeDefined();
//   });
// });
