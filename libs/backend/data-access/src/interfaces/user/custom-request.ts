//4. create a request when a client makes a request to the server
import { PrismaClient, User, UserRole } from '@prisma/client'
import { Request } from 'express'

const prisma = new PrismaClient()

interface SafeUser extends Omit<User, 'passwordHash'>{
  passwordHash?:string
}
//using the generate Type parameter of T allows us to be able to add
// additional properities to the reqquest object as needed.
export interface CustomRequest<T = {}> extends Partial<Request> {
  id: string
  user: {
    id: string
  }
  userId: string
  body: T
  headers: {
    authorization?: string
    [key: string]: any
  }
  startTime?: number
  prisma: PrismaClient
  currentUser?: User | null
  accessToken?: string | null
  context?: T
}

// Define the ExtendedCustomRequest interface that extends CustomRequest with additional properties
export interface ExtendedCustomRequest<T = {}> extends Request<T> {
  context?: T
  cache?: string
  credentials?: string
  destination?: string
  integrity?: string
}

const currentUser: User = {
  id: '123',
  email: 'test@example.com',
  name: 'Test User',
  roles: [UserRole.USER],
  createdAt: new Date(),
  updatedAt: new Date(),
  userProfileId: null,  
  passwordHash: '1234',
  resetPasswordToken: '',
}


const safeUser:SafeUser = {
  id: currentUser.id,
  email: currentUser.email,
  name: currentUser.name,
  roles: currentUser.roles,
  createdAt: currentUser.createdAt,
  updatedAt: currentUser.updatedAt,
  resetPasswordToken: currentUser.resetPasswordToken,
  userProfileId: currentUser.userProfileId,  
}


const mockRequest: CustomRequest = {
  id: 'abc123',
  user: { id: '456' },
  userId: '456',
  body: {},
  headers: {},
  prisma,
  currentUser: {...safeUser, passwordHash: ''},
  accessToken: 'token',
  context: {},
};


// //used internally for testing
// type MockedHttpServer = HttpServer & {
//   get: (name: string) => string[] | null | undefined,
//   header: (name: string) => string | undefined
// }

// export const customRequest = {
//   context: {} as Context,
//   get: jest.fn(),
//   header: jest.fn(),
//   headers: {} as any,
//   params: {} as ParamsDictionary,
//   query: {} as ParsedQs,
//   // arrayBuffer: {} as any,
//   // body: {} as any,
//   // bodyUsed: {} as any,
//   // blob: {} as any,
//   // cache: {} as any,
//   // clone: {} as any,
//   // credentials: {} as any,
//   // destination: {} as any,
//   // formData: {} as any,
//   // integrity: {} as any,
//   // json: {} as any,
//   // keepalive: {} as any,
//   // method: {} as any,
//   // mode: {} as any,
//   // redirect: {} as any,
//   // referrer: {} as any,
//   // referrerPolicy: {} as any,
//   // signal: {} as any,
//   // text: {} as any,
//   // user: {} as User,
//   // url: {} as any,
// } as CustomRequest

// const mockedHttpServer = createMock<MockedHttpServer>({
//   get: () => [],
//   header: () => undefined,
// })

// const cookies = mockedHttpServer.get('set-cookie')
// const cookieHeader = cookies?.join('; ') ?? null
// const headerName = 'name'
// const headerValue = mockedHttpServer.header(headerName) ?? null
