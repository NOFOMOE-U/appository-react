import { PrismaClient, User } from '@prisma/client';
import { CustomRequest } from '../interfaces/user/custom-request';
import { createContext } from './create-context';

describe('createContext', () => {
  const prisma = new PrismaClient();

  it('should create a context object with the correct properties', async () => {
    const currentUser: User = {
      id: '123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: 'randomHash',
      roles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      resetPasswordToken: '',
      userProfileId: 0
    };

    const safeUser = {
      id: currentUser.id,
      email: currentUser.email,
      name: currentUser.name,
      roles: currentUser.roles,
      createdAt: currentUser.createdAt,
        updatedAt: currentUser.updatedAt,
      passwordHash: currentUser.passwordHash,
      resetPasswordToken: currentUser.resetPasswordToken,
      userProfileId: currentUser.userProfileId,
    };

    const mockRequest: CustomRequest<{}> = {
      id: 'abc123',
      user: {
        id: '456',
        email:"",
        name: "",
        roles: [],
        createdAt: new Date,
        updatedAt: new Date,
        userProfileId: 0 ,
        
     
      },
      userId: '456',
      // body: {},
      headers: {},
      prisma,
      currentUser: {
        ...safeUser,
        passwordHash: undefined
      },
      accessToken: undefined,
      //context: {},
    };

    const context = await createContext(prisma, mockRequest);

    expect(context).toHaveProperty('prisma', prisma);
    expect(context).toHaveProperty('currentUser', currentUser);
    expect(context).toHaveProperty('userId', currentUser.id);
    expect(context).toHaveProperty('token', '');
  });
});
