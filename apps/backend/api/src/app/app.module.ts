import { CoreModule } from '@appository/backend/core';
import {
  Module
} from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLConfigService } from './gql.config';
import {PrismaService} from '@appository/backend/data-access'
@Module({
  imports: [
  CoreModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLConfigService,
      imports:[PrismaService]
    })
  ],
  controllers: [AppController],
  providers: [AppService,GraphQLConfigService],
})
export class AppModule {

}
