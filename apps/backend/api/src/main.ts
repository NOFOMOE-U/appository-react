//Users/dixiejones/Development/main-app/appository-react/apps/backend/api/src/main.ts
import { LoggingMiddleware } from '@appository/backend/data-access';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
// import { PermissionsController } from 'libs/backend/data-access/src/middleware/permissions/permissions.controller';
// import { getUserId } from 'libs/backend/data-access/src/utils/backend-auth-utils';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // const { default: graphqlUploadExpress } = await import(
  //   'graphql-upload/graphqlUploadExpress.mjs'import { permissions } from '../../../../libs/backend/data-access/src/middleware/permissions/permissions';

  // );
  // app.use(graphqlUploadExpress(configService.get<IUploaderMiddlewareOptions>('uploader.middleware')));
  // https://dev.to/tugascript/nestjs-graphql-image-upload-to-a-s3-bucket-1njg
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(LoggingMiddleware.createMiddleware(new LoggingMiddleware()));

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    Logger.log(`Running in ${config.get('environment')} mode`);
  });
}

bootstrap();
 