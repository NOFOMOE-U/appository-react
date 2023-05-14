import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';
import { LoggingInterceptor } from './logging.interceptor';
// #todo .... fix error
describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;
  let context: ExecutionContext;
  let handler: CallHandler<any>;
  let logger: any;

  beforeEach(() => {
    interceptor = new LoggingInterceptor();
    context = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({
        method: 'GET',
        originalUrl: '/test',
      }),
    } as any;
    handler = {
      handle: jest.fn().mockReturnValue(of('response')),
    } as any;
    logger = {
      info: jest.fn(),
    };
    jest.spyOn(interceptor, 'getLogger').mockReturnValue(logger);
  });

  it('should log request and response information', async () => {
    await interceptor.intercept(context, handler).toPromise();
    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('[REQ'));
    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('GET /test'));
    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('completed in'));
  });
});
