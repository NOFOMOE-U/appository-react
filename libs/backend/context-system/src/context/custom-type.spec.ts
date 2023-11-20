import { PrismaClient } from "@prisma/client";
import { CustomType } from './custom-type';

describe('CustomType', () => {
  let customType: CustomType;
  const prisma = new PrismaClient();
  
  beforeEach(() => {
    customType = {
      id: '123',
      prisma,
      userId: '456',
      currentUser: 'test-user',
      accessToken: 'abc123'
    };
  });
  
  afterEach(async () => {
    await prisma.$disconnect();
  });
  
  it('should have an `id` property of type string or null', () => {
    expect(typeof customType.id).toMatch(/^(string|null)$/);
  });
  
  it('should have a `prisma` property of type PrismaClient', () => {
    expect(customType.prisma).toBeInstanceOf(PrismaClient);
  });
  
  it('should have a `userId` property of type string or null', () => {
    expect(typeof customType.userId).toMatch(/^(string|null)$/);
  });
  
  it('should have a `currentUser` property of type string or null', () => {
    expect(typeof customType.currentUser).toMatch(/^(string|null)$/);
  });
  
  it('should have an `accessToken` property of type string or null', () => {
    expect(typeof customType.accessToken).toMatch(/^(string|null)$/);
  });
});
