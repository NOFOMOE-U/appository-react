import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

export const createTestContext = (): {
  prisma: PrismaClient;
  currentUser: any;
  req: Request;
} => {
  const prisma = new PrismaClient();

  const currentUser = { id: 'user-id' }; // Replace with your own mock user

  const req = { headers: { authorization: 'Bearer fake-token' } } as Request; // Replace with your own mock request object

  return { prisma, currentUser, req };
};
