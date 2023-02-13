/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'

import { ConfigService } from '@nestjs/config'
import { AppModule } from './app/app.module'


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  app.use(cookieParser())
  const port = process.env.PORT || 3333
  Error.stackTraceLimit = Infinity;
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
  Logger.log(`Running in ${config.get("environment")} mode`)
}

bootstrap()
