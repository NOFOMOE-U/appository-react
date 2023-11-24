import { PrismaClient } from '@prisma/client';
import AppAbility from './defineAbilities';
export type AppContext = {
  req: {
    userId: string;
  };
  prisma: PrismaClient;
  ability: typeof AppAbility;
};