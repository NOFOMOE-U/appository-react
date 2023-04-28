import { PrismaClient, User } from '@prisma/client';
import { ExtendedCustomRequest } from '../interfaces/user/custom-request';
import { CustomRequestWithContext } from './custom-request-with-context';

export interface MyContext<T = {}> {
  ctx?: any;
  req?: ExtendedCustomRequest<MyContext<T>>;
  cookies?: Record<string, string>;
  userId?: string | undefined;
  accessToken?: string | undefined;
  token?: string | null;
  request?: CustomRequestWithContext<MyContext<T>>;
  prisma?: PrismaClient;
  body?: any;
  session?: any;
  cache?: any;
  credentials?: any;
  id?: string;
}

export interface UserWithAccessToken extends User {
  accessToken: string | null
}
