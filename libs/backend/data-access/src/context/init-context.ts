import { PrismaClient } from '@prisma/client';
import { getUserId } from '../utils/backend-auth.utils';
import { CustomRequestWithContext } from './custom-request-with-context';

export async function createInitialContext(prisma: PrismaClient, req: CustomRequestWithContext) {
  const accessToken = req.cookies['access_token'] || null;
  const userId = await getUserId(req);
  let currentUser = null;
  
  if (userId) {
    currentUser = await prisma.user.findUnique({
      where: { id: userId.toString() },
    });
  }
  
  return {
    accessToken,
    userId,
    currentUser,
  };
}
