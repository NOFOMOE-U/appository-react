//Users/dixiejones/Development/main-app/appository-react/libs/backend/data-access/src/context/context.module.ts
import { PrismaModule } from '@appository/backend/data-access'
import { Module } from '@nestjs/common'
import { createContext } from './context'
@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'CONTEXT',
      useFactory: async () => createContext(),
    },
  ],
  exports: [
    'CONTEXT'
  ],
})
export class ContextModule {}


// //before
// import { Module } from '@nestjs/common';

// @Module({
//     imports: []
// })
// export class ContextModule {}
