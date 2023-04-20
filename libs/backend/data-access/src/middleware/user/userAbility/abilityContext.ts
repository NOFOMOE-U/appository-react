import { PrismaClient } from '@prisma/client';
import { AppAbility } from './createPrismaAbillity';
export type AppContext = {
  req: {
    userId: string;
  };
  prisma: PrismaClient;
  ability: AppAbility;
};
