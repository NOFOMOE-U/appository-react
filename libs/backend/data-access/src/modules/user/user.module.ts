//Users/dixiejones/Development/main-app/appository-react/libs/backend/data-access/src/modules/user/user.module.ts
import { TypesModule } from '@appository/backend/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { PrismaClient } from 'libs/backend/data-access/src/node_modules/.prisma/client';
import { join } from 'path';
import { UserResolver } from './user.resolver';

const prisma = new PrismaClient()// added basedd on dev/graphql

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (): GqlModuleOptions => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
      }),
    }),
    TypesModule,
  ],
  providers: [UserResolver,
    {
      provide: 'PRISMA_CLIENT',
      useValue: prisma,
    },],
})
export class UserModule {}
