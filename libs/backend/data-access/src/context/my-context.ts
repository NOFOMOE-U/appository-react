import { PrismaClient, User, UserRole } from '@prisma/client';
import { ExtendedCustomRequest } from '../interfaces/user/custom-request';
import { CustomSessionType } from '../make-api/my-custom-request';
import { CustomRequestWithContext } from '../make-api/requests/custom-request-with-context';
import { UserWithoutSensitiveData } from '../modules/user/user';
import { AppConfiguration } from './app-configuration';

export interface MyContext<T = {}> extends Record<string, unknown> {
  config: AppConfiguration
  ctx: any,
  req?: CustomRequestWithContext<MyContext<T>>['req'] & ExtendedCustomRequest<MyContext<T>>
  userId?: string | undefined
  accessToken: string | undefined
  token?: string | null
  request?: Request | undefined
  prisma?: PrismaClient
  body?: any
  context: MyContext 
  session: CustomSessionType
  accepts: (types: string | string[]) => string[]
  cache?: RequestCache
  id?: string
  cookies?: Record<string, string>
  signedCookies: Record<string, string>,
  get: (name: string) => string | undefined
  currentUser?: UserWithAccessToken | UserWithoutSensitiveData | null | undefined;
}  

export interface UserWithAccessToken extends User {
  id: string
  name: string
  email: string
  passwordHash: string
  roles: UserRole[]
  createdAt: Date
  updatedAt: Date
  accessToken: string
  userProfileId?: number 
  resetPasswordToken?: string | undefined
}
