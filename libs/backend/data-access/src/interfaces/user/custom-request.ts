//4. create a request when a client makes a request to the server
import { PrismaClient, User, UserRole } from '@prisma/client';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { UserWithoutSensitiveData } from '../../modules/user/user';

const prisma = new PrismaClient()

declare const jest: {
  fn: Function
}

interface SafeUser extends Omit<User, 'passwordHash' | 'resetPasswordToken'> {
  passwordHash?: undefined
  resetPasswordToken?: string
}

//using the generate Type parameter of T allows us to be able to add
// additional properities to the reqquest object as needed.
export interface CustomRequest<T = {}> extends Partial<Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>> {
  id: string
  user?: UserWithoutSensitiveData | null
  userId?: string
  body?: T | undefined
  headers: {
    authorization?: string
    [key: string]: string | string[] | undefined
  }
  startTime?: number
  prisma: PrismaClient
  currentUser?: UserWithoutSensitiveData | undefined | null
  accessToken?: string | null
  context?: T
}

// Define the ExtendedCustomRequest interface that extends CustomRequest with additional properties
export interface ExtendedCustomRequest<T extends {} = {}> extends CustomRequest {
  context?: T
  cache?: string
  credentials?: string
  destination?: string
  integrity?: string
  accessToken?: string
  headers: {
    [name: string]: string | string[] | undefined
  }
  cookies: Record<string, string>
  signedCookies: Record<string, string>
  ctx: T
}

const currentUser: UserWithoutSensitiveData = {
  id: '123',
  email: 'test@example.com',
  name: 'Test User',
  roles: [UserRole.USER],
  createdAt: new Date(),
  updatedAt: new Date(),
  userProfileId: null,
}

const safeUser: SafeUser = {
  id: currentUser.id,
  email: currentUser.email,
  name: currentUser.name,
  roles: currentUser.roles,
  createdAt: currentUser.createdAt,
  updatedAt: currentUser.updatedAt,
  userProfileId: currentUser.userProfileId,
  passwordHash: undefined,
}

const mockRequest: CustomRequest = {
  id: 'abc123',
  user: safeUser,
  userId: '456',
  body: {},
  headers: {},
  prisma,
  currentUser,
  accessToken: 'token',
  context: {},
  get: jest.fn(),
}

export default mockRequest
