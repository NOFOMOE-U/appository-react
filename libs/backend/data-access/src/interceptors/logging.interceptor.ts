import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getRequestContext } from '../context/context.utils';
import { CustomRequest } from '../interfaces/user/custom-request';
import { getLogger } from '../middleware/logging/logging.utils';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logger = getLogger();
    const now = Date.now();
    const req = context.switchToHttp().getRequest<CustomRequest>();
    const ctx = getRequestContext();

    const { method, originalUrl } = req;
    const { id } = ctx;

    logger.info(`[REQ ${id}] ${method} ${originalUrl}`);

    return next.handle().pipe(
      tap(() => {
        const timeDiff = Date.now() - now;
        logger.info(`[REQ ${id}] ${method} ${originalUrl} completed in ${timeDiff}ms`);
      }),
    );
  }
}
