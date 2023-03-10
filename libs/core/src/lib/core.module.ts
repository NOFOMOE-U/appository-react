import { TypesModule } from '@appository/backend/common';
import { PrismaService } from '@appository/backend/data-access';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'; //--removed
import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigService
} from '@nestjs/config'; // --removed
import { GraphQLModule } from '@nestjs/graphql'; // --removed
import { configuration } from './config/configuration'; //must update #todo
import { validationSchema } from './config/validation'; //must update #todo
import { CoreResolver } from './core.resolver';
@Module({
  imports: [
    TypesModule,
  ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema, //--removed
    }),
    GraphQLModule.forRootAsync
      <ApolloDriverConfig>//--removed
      ({
      driver: ApolloDriver,//--removed
        useFactory: async (configService: ConfigService) => ({
          autoSchemaFile: true,
          debug: true,
          playground:true,
          context: {prisma: new PrismaService() },
        }),
        inject:[ConfigService]
    }),
  
  ],
  controllers: [],
  providers: [CoreResolver],//where to move the coreResolver
  exports: [CoreResolver],
})
export class CoreModule {}
