import { PrismaClient } from '@prisma/client';
import { ExtendedCustomRequest } from '../interfaces/user/custom-request';
import { CustomRequestWithContext } from '../make-api/custom-request-with-context';
import { MyContext, UserWithAccessToken } from './my-context';

describe('MyContext', () => {
  let prisma: PrismaClient;
  beforeEach(() => {
    prisma = new PrismaClient();
  });
  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should have the correct properties', () => {
    const context: MyContext<UserWithAccessToken> = {
      ctx: {},
      req: {} as ExtendedCustomRequest<MyContext<UserWithAccessToken>>,
      cookies: {},
      userId: 'user-id',
      accessToken: 'access-token',
      token: 'token',
      request: {} as CustomRequestWithContext<MyContext<UserWithAccessToken>>,
      prisma,
      body: {},
      session: {},
      cache: {},
      credentials: {},
      id: 'id',
    };

    expect(context).toHaveProperty('ctx');
    expect(context).toHaveProperty('req');
    expect(context).toHaveProperty('cookies');
    expect(context).toHaveProperty('userId');
    expect(context).toHaveProperty('accessToken');
    expect(context).toHaveProperty('token');
    expect(context).toHaveProperty('request');
    expect(context).toHaveProperty('prisma');
    expect(context).toHaveProperty('body');
    expect(context).toHaveProperty('session');
    expect(context).toHaveProperty('cache');
    expect(context).toHaveProperty('credentials');
    expect(context).toHaveProperty('id');
  });
});
