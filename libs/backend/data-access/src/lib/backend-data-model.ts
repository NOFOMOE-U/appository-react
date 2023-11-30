// backend/data-access/src/lib/backend-data-model.module.ts
import { PrismaController, PrismaService } from '@appository/backend/data-access'
import { CustomRequest } from '@appository/backend/request-options'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Injectable, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { CommonContextModule } from '../common-context/common-context.module'
import { PrismaModule } from './prisma/prisma.module'
//todo aqua
// import { AquaModule } from 'libs/backend/communication/src/aqua/aqua.module'
import { UserModule } from '@appository/backend/users'
import { createContext } from 'libs/backend/context-system/src/context/create-context'
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
    
    // AquaModule // added aqua
    PrismaModule,
    UserModule,
    // PostModule,
    CommonContextModule,
  ],
  exports: ['PrismaClient', 'CONTEXT', PrismaModule],
})
@Injectable()
export class BackendDataModelModule {}
