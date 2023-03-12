//Users/dixiejones/Development/main-app/appository-react/libs/backend/data-access/src/context/context.module.ts
import { PrismaModule } from '@appository/backend/data-access'
import { Module } from '@nestjs/common'
import { createContext } from './context'
import { ContextService } from './context.service'
@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'CONTEXT',
      useFactory: async (contextService: ContextService) => createContext(),
      inject: [ContextService]
    },
    ContextService
  ],
  exports: [
    'CONTEXT',
    ContextService
  ],
})
export class ContextModule {}


// //before
// import { Module } from '@nestjs/common';

// @Module({
//     imports: []
// })
// export class ContextModule {}
