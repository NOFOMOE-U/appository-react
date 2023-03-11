import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  static createMiddleware() {
    return async (req: Request, _: Response, next: NextFunction) => {
      // Your middleware logic here
      next()
    }
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req
    const start = new Date().getTime()

    res.on('finish', () => {
      const responseTime = new Date().getTime() - start
      console.log(`Request ${method} ${originalUrl} ${res.statusCode} ${responseTime}ms`)
    })

    next()
  }
}
