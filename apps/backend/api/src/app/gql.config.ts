import { ApolloDriver } from '@nestjs/apollo'
import { Injectable, Type } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost } from '@nestjs/core'
import { AbstractGraphQLDriver, GqlModuleAsyncOptions, GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'
import { makeSchema } from 'nexus'
import * as path from 'path'
import { join } from 'path'
import {PrismaService} from './prisma/prisma.service'
@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    const app = this.httpAdapterHost.httpAdapter.getInstance()
    const isDev = this.configService.get('NODE_ENV') === 'development'
    const autoSchemaFile = join(process.cwd(), 'src/schema.gql')
    const driver: Type<AbstractGraphQLDriver<GqlModuleAsyncOptions>> = isDev ? (ApolloDriver as any) : (AbstractGraphQLDriver as any);
    const imports = isDev
    ? [HttpAdapterHost, { provide: AbstractGraphQLDriver, useClass: ApolloDriver }]
    : [PrismaService, { provide: AbstractGraphQLDriver, useClass: ApolloDriver }];    const schemaDirectives = { key: null }

    const schema = makeSchema({
      types: [],
      outputs: {
        schema: path.join(process.cwd(), 'schema.graphql'),
        typegen: path.join(process.cwd(), 'generated/nexus.ts'),
      },
      contextType: {
        module: path.join(process.cwd(), 'app/gql.context.ts'),
        export: 'Context',
      },
    });
    return {
      debug: isDev,
      playground: isDev,
      autoSchemaFile,
      sortSchema: isDev,
      installSubscriptionHandlers: isDev,
      context: { prisma: this.prisma },
      driver,
      imports,
schemaDirectives,
    } as GqlModuleAsyncOptions
  }
}
