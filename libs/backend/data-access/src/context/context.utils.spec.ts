import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CustomRequestWithContext } from '../make-api/requests/custom-request-with-context';
import { Context } from './context';
import { contextNamespace, getRequestContext, getUserInfoFromDB, setRequestContext } from './context.utils';
import { MyContext } from './my-context';

describe('context-utils', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('getUserInfoFromDB', () => {
    it('should return null if there is no user ID', async () => {
      const req = { user: undefined } as CustomRequestWithContext<MyContext>;
      const res = {} as Response;
      const user = await getUserInfoFromDB(prisma, req, res);
      expect(user).toBeNull();
    });

    it('should return null if the user ID is not a number', async () => {
      const req = { user: { id: 'not-a-number' } } as CustomRequestWithContext<MyContext>;
      const res = {} as Response;
      const user = await getUserInfoFromDB(prisma, req, res);
      expect(user).toBeNull();
    });

    it('should return the user information if it exists', async () => {
      const newUser = await prisma.user.create({
        data: {
          email: 'testuser@example.com',
          name: 'Test',
          passwordHash: 'undefined'
        },
      });

      const req = { user: { id: newUser.id.toString() } } as CustomRequestWithContext<MyContext>;
      const res = {} as Response;
      const user = await getUserInfoFromDB(prisma, req, res);
      expect(user?.id).toEqual(newUser.id);
      expect(user?.email).toEqual(newUser.email);
      expect(user?.name).toEqual(newUser.name);

      await prisma.user.delete({ where: { id: newUser.id } });
    });
  });

  describe('setRequestContext', () => {
    it('should set the request ID in the context namespace', () => {
      const requestId = '123';
      setRequestContext(requestId);
      const id = contextNamespace.get('requestId');
      expect(id).toEqual(requestId);
    });
  });

  describe('getRequestContext', () => {
    it('should return an object with the request ID', () => {
      const { id } = getRequestContext();
      expect(typeof id).toEqual('string');
      expect(uuidv4(id)).toMatch(/^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i);
    });

    it('should set the request ID in the context namespace', () => {
      const { id } = getRequestContext();
      const requestId = contextNamespace.get('requestId');
      expect(requestId).toEqual(id);
    });
  });

  describe('Context', () => {
    it('should create a new context with the given parameters', async () => {
      const newUser = await prisma.user.create({
          data: {
          email: 'testuser@example.com',
          name: 'Test',
          passwordHash: 'User',
        },
      });

      const req = { user: { id: newUser.id.toString() } } as CustomRequestWithContext<MyContext>;
      const res = {} as Response;
      const context = await Context.create(prisma, req, res);

      expect(context.id).toBeDefined();
      expect(typeof context.id).toEqual('string');
        expect(contextNamespace.get(''))
      await prisma.user.delete({ where: { id: newUser.id } });
    });
    });
    });