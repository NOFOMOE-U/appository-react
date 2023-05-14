import { User } from '@prisma/client';
import { removeSensitiveData } from './remove-sensitive-data';

describe('removeSensitiveData', () => {
  it('should remove sensitive data from a user object', () => {
    const user: User = {
      id:'1',
      email: 'test@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = removeSensitiveData(user);

    expect(result).toEqual({
      id: 1,
      email: 'test@example.com',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
