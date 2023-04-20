import {
  BackendAuthMiddleware,
  BackendDataAccessModule,
  ContextModule,
  ContextService,
  CustomRequestWithContext,
  PrismaClient,
  PrismaModule,
} from '@appository/backend/data-access'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { NextFunction } from 'express'
import { authenticateUser } from '../user/user.middleware'
@Module({
  imports: [BackendDataAccessModule, ContextModule, PrismaModule],
})
export class BackendAuthModule implements NestModule {
  constructor(private readonly contextService: ContextService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BackendAuthMiddleware).forRoutes('*')
    consumer.apply(async (req: CustomRequestWithContext, prisma: PrismaClient, res: Response, next: NextFunction) => {
      // Use req.myCustomProperty and req.anotherCustomProperty here
      this.contextService.createContext(req, prisma)
      next()
    })

    //Add the authenticateUser middleware to the middleware stack
    consumer.apply(authenticateUser).forRoutes('*')
  }
}
