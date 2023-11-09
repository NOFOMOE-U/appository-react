import { PrismaClient, UserRole } from '@prisma/client';
import { rule } from 'graphql-shield';
import { getUserById } from '../../../modules/user/user-queries/get-user-by-id';
import errorMessages from '../error-messages';

const prisma = new PrismaClient();

export const isEditor = rule()(async(_, __, {request}) => {
  const userId = getUserById(request);

  if (typeof userId !== 'string') {
    return new Error(errorMessages.notAuthorized)
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if(user?.roles?.includes(UserRole.EDITOR)) {
    return true
  } else {
    return new Error(errorMessages.notAuthorized)
  }
});