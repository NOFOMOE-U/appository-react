//Users/dixiejones/Development/main-app/appository-react/apps/backend/api/src/main.ts
import { CustomRequestWithContext, LoggingMiddleware, MyContext, MyCustomRequest, YourRequestObject, initContext } from '@appository/backend/data-access'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { CustomContextType } from 'libs/backend/data-access/src/context/custom-context-type'
import { AppModule } from './app/app.module'


async function bootstrap() {
  const req = {} as CustomRequestWithContext<MyContext<YourRequestObject<CustomContextType>>>;
  
  //initia the context using init
  const myContext = await initContext(req);
  const myRequest = new MyCustomRequest(myContext);

  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  //#TODO
  // const { default: graphqlUploadExpress } = await import(
  //   'graphql-upload/graphqlUploadExpress.mjs'import { permissions } from '../../../../libs/backend/data-access/src/middleware/permissions/permissions';

  // app.use(graphqlUploadExpress(configService.get<IUploaderMiddlewareOptions>('uploader.middleware')));
  // https://dev.to/tugascript/nestjs-graphql-image-upload-to-a-s3-bucket-1njg
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(LoggingMiddleware.createMiddleware(new LoggingMiddleware()));

  //Enable CORS and body pargins middleware as needed
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
    Logger.log(`Running in ${config.get('environment')} mode`);
});
}
  

bootstrap()
