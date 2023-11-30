//Users/dixiejones/Development/main-app/appository-react/libs/backend/common/src/context/context.module.ts
import { CustomRequest } from '@appository/backend/request-options';
import { UserWithoutSensitiveData } from '@appository/backend/users';
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { getUserId } from 'libs/backend/data-access/src/utils/backend-auth.utils';
import { createContext } from './create-context';
import { MyContext } from './my-context';
@Module({
  providers: [
    {
      provide: 'CONTEXT',
      useFactory: async (req: any,  prisma: PrismaClient) => {
        const context = await createContext(prisma, req as CustomRequest<MyContext<{}>>)
        const userId = await getUserId(req);
        if (userId) {
          const user = await getUserId(userId.toString())
          context.currentUser = user as unknown as UserWithoutSensitiveData 
        }
        return context;
      },
      inject: ['REQUEST', PrismaClient]
    },
  ],
  exports: ['CONTEXT',
    createContext 
  ],
})
export class ContextModule {}