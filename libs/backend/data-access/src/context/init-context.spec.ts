// import { PrismaClient } from '@prisma/client';
// import { CustomRequestWithContext } from '../make-api/custom-request-with-context';
// import { ExtendedCustomRequestWithPrisma } from './create-nested-context';
// import { createInitialContext } from './init-context';

// describe('createInitialContext', () => {
//   let prisma: PrismaClient;
//   let req: CustomRequestWithContext<Request>;

//   beforeEach(() => {
//     prisma = new PrismaClient();
//     req = {
//       cookies: {},
//       request: req as CustomRequestWithContext<Request>,
//       prisma,
//     } as ExtendedCustomRequestWithPrisma extends Request 
//   });

//   afterEach(async () => {
//     await prisma.$disconnect();
//   });

//   it('should create initial context with null values when no user is logged in', async () => {
//     const context = await createInitialContext(prisma, req);

//     expect(context.accessToken).toBeNull();
//     expect(context.userId).toBeNull();
//     expect(context.currentUser).toBeNull();
//   });

//   it('should create initial context with user data when user is logged in', async () => {
//     // Create a user in the database
//     const user = await prisma.user.create({
//       data: {
//         name: 'John Doe',
//         email: 'johndoe@example.com',
//         passwordHash: 'passwordhash',
//       },
//     });

//     // Set the access token in the request cookies
//     req.cookies['access_token'] = 'token';

//     // Set the user ID in the request headers
//     req.headers['x-user-id'] = user.id;

//     const context = await createInitialContext(req);

//     expect(context.accessToken).toBe('token');
//     expect(context.userId).toBe(user.id);
//     expect(context.currentUser).toEqual({
//       id: user.id,
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       createdAt: user.createdAt,
//       updatedAt: user.updatedAt,
//     });
//   });
// });
