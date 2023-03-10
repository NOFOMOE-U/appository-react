import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class PermissionsMiddleware implements NestMiddleware {
  async use(req: Request, _: Response, next: NextFunction) {
    // Your middleware logic here
    await next();
  }
}
