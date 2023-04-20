import { getUserById } from '@appository/backend/data-access';
import { UserRole } from '@prisma/client';
import { rule } from 'graphql-shield';
import errorMessages from '../error-messages';


export const isAdmin = rule()(async (_, __, { request, prisma }) => {
  const userId = await getUserById(request, prisma);
  if (typeof userId !== 'string') {
    return new Error(errorMessages.notAuthorized);
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user?.roles?.includes(UserRole.ADMIN)) {
    return true
  } else {
    return new Error(errorMessages.notAuthorized);
  }
});
