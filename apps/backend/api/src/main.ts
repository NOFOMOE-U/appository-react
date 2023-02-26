import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'

import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { GraphQLConfigService } from './app/gql.config'
import { PrismaService } from './../../../../prisma'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = app.get(ConfigService)
  const globalPrefix = 'api'

  app.setGlobalPrefix(globalPrefix)
  app.use(cookieParser())
  const port = process.env.PORT || 3333
  Error.stackTraceLimit = Infinity

  const httpAdapterHost = app.get(HttpAdapterHost)
  const prismaService = app.get(PrismaService)
  const gqlConfigService = app.get(GraphQLConfigService) // create an instance of GraphQLConfigService

  const isDev = config.get('environment') === 'development'
  const gqlOptions = await gqlConfigService.createGqlOptions() // call the method on the instance
  const apolloApp = app.getHttpAdapter().getInstance()
  const server = await apolloApp.createApolloServer(gqlOptions)

  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
  Logger.log(`Running in ${config.get('environment')} mode`)
}

bootstrap()
