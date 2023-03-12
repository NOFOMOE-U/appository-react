import { PrismaModule } from '@appository/backend/data-access';
import { Module } from '@nestjs/common';
import { createContext } from '../context/context';

@Module({
  controllers: [PrismaModule],
  providers: [
    {
      provide: 'CONTEXT',
      useFactory: async () => createContext(),
    },
  ],
  exports: ['CONTEXT'],
})
export class BackendCommonModule {}
