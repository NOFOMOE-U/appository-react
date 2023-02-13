import { SharedDataModule } from '@appository/shared/module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { configuration } from './config/configuration'
import { validationSchema } from './config/validation'
import { CoreController } from './core.controller'
import { CoreResolver } from './core.resolver'
import { CoreService } from './core.service'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      // typePaths: ['./**/*.graphql'],
      autoSchemaFile: true
    }),
    SharedDataModule,
  ],
  controllers: [CoreController],
  providers: [CoreResolver, CoreService],
  exports: [GraphQLModule],
})
export class CoreModule {}
