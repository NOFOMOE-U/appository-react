import { getUserById } from '@appository/backend/data-access';
import { PrismaClient } from '@prisma/client';
import { rule } from 'graphql-shield';

const prisma = new PrismaClient();

export const isAuthenticatedUser = rule()((_, __, { request }) => {
  const userId = getUserById(request, prisma);
  return Boolean(userId);
});
