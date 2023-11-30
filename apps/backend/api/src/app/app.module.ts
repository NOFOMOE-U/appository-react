import { CommunicationModule } from '@appository/backend/communication'
import {
  LoggingModule,
  PrismaModule,
} from '@appository/backend/data-access'
import { UserModule } from '@appository/backend/users'
// import { CoreModule } from '@appository/core'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
// import {SocketModule} from '@nestjs/platform-socket.io'
import { PermissionsModule } from '@appository/backend/data-access'
const permissionsEnabled= true

@Module({
  imports: [
    // SocketModule,
    UserModule,
    CommunicationModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (): GqlModuleOptions => ({
        autoSchemaFile: join(process.cwd(), 'libs/backend/data-access/src/graphql/schema.graphql'),
      }),
    }),
    PrismaModule,

    LoggingModule,//todo set up to be used
    PermissionsModule.forRoot(permissionsEnabled),
  ],
  controllers: [AppController],
  providers: [AppService,
    // PrismaService, removing
    // ContextService removing
  ],
})
export class AppModule {}
