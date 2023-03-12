import { LoggingModule, PermissionsMiddleware, PermissionsModule, PrismaModule, UserModule } from '@appository/backend/data-access'
import { CoreModule } from '@appository/core'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'

const options = {
  permissionsEnabled: true,
}
@Module({
  imports: [
    CoreModule,
    UserModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (): GqlModuleOptions => ({
        autoSchemaFile: join(process.cwd(), 'libs/backend/data-access/src/graphql/schema.graphql'),
      }),
    }),
    PrismaModule,

    LoggingModule,
    PermissionsModule.forRoot(options),
  ],
  controllers: [AppController],
  providers: [AppService, PermissionsMiddleware],
})
export class AppModule {}
