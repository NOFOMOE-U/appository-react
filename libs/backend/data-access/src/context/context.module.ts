//Users/dixiejones/Development/main-app/appository-react/libs/backend/common/src/context/context.module.ts
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../interfaces/user/custom-request';
import { UserWithoutSensitiveData, getUserById } from '../modules/user/user';
import { getUserId } from '../utils/backend-auth.utils';
import { createContext } from './create-context';
@Module({
  providers: [
    {
      provide: 'CONTEXT',
      useFactory: async (req: CustomRequest<{}>,  prisma: PrismaClient) => {
        const context = await createContext(prisma, req)
        const userId = await getUserId(req);
        if (userId) {
          const user = await getUserById(userId.toString(), prisma)
          context.currentUser = user as UserWithoutSensitiveData
        }
        return context;
      },
      inject: ['REQUEST', PrismaClient]
    },
  ],
  exports: ['CONTEXT',
    // createContext removing
  ],
})
export class ContextModule {}