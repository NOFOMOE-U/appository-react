//backend/data-access/src/lib/backend-data-model.module.ts
import { CommonContextModule, createContext, CustomRequest, PrismaController, PrismaService } from '@appository/backend/data-access'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Injectable, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { UserModule } from '../modules/user/user.module'
import prisma from './prisma/prisma'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  

  controllers: [PrismaController],
  providers: [
    {
      provide: 'CONTEXT',
      useFactory: async (req: CustomRequest<{}>) => createContext(prisma,req),
    },
    PrismaService
  ],

  imports: [
  ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        autoSchemaFile: join(process.cwd(), 'libs/backend/data-access/src/schema.gql'),
        debug: true,
        playground: true,
      }),
    }),
    
    PrismaModule,
    UserModule,
    // PostModule,
    CommonContextModule,
  ],
  exports: ['PrismaClient','CONTEXT', PrismaModule], //changed based on dev/graphql, from PrismaService to PrismaClient
})
@Injectable()
export class BackendDataModelModule {}
