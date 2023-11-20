import { PrismaClient } from '@prisma/client';
import { ContextType } from './context-type';

describe('ContextType', () => {
  it('should have the expected properties', () => {
    const context: ContextType = {
      id: null,
      prisma: new PrismaClient(),
      userId: null,
      currentUser: null,
      accessToken: null,
    };

    expect(context).toHaveProperty('id');
    expect(context).toHaveProperty('prisma');
    expect(context).toHaveProperty('userId');
    expect(context).toHaveProperty('currentUser');
    expect(context).toHaveProperty('accessToken');
  });
});
