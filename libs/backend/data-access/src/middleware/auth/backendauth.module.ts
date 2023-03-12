import { ContextModule, ContextService } from '@appository/backend/common';
import { BackendAuthMiddleware } from '@appository/backend/data-access';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
@Module({
  imports: [ContextModule],
})
export class BackendAuthModule implements NestModule {
  constructor(private readonly contextService: ContextService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BackendAuthMiddleware).forRoutes('*');
    consumer.apply(async (req, res, next) => {
      this.contextService.createContext(req);
      next();
    });
  }
}
