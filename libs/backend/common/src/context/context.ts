import { PrismaService } from '@appository/backend/data-access';
import { PrismaClient } from '@prisma/client';
import { User } from 'libs/backend/data-access/src/node_modules/.prisma/client';

export interface Context {
  prisma: PrismaClient;
  user:  User;
  // post: Post;
  // profile: Profile;
}

export async function createContext(): Promise<Context> {
  const prismaService = new PrismaService();
  const prisma = await prismaService.createContext().then((ctx) => ctx.prisma);
  const user = {} as User; // Replace {} with actual user object
  // const post = {} as Post; // Replace {} with actual post object
  // const profile = {} as Profile; // Replace {} with actual profile object
  return {
    prisma,
    user,
    // post,
    // profile,
  };
}
