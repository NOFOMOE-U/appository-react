//Users/dixiejones/Development/main-app/appository-react/apps/backend/api/src/main.ts
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
  
import { LoggingMiddleware } from '@appository/backend/data-access'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)

  // const { default: graphqlUploadExpress } = await import(
  //   'graphql-upload/graphqlUploadExpress.mjs'
  // );
  // app.use(graphqlUploadExpress(configService.get<IUploaderMiddlewareOptions>('uploader.middleware')));
  // https://dev.to/tugascript/nestjs-graphql-image-upload-to-a-s3-bucket-1njg
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  app.use(LoggingMiddleware.createMiddleware())


  const port = process.env.PORT || 3333
  await app.listen(port)
  console.log(`Server is running on http://localhost:${port}`);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
  Logger.log(`Running in ${config.get("environment")} mode`)
}

bootstrap()
