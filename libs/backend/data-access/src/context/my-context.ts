import { PrismaClient, UserRole } from '@prisma/client';
import { ExtendedCustomRequest } from '../interfaces/user/custom-request';
import { CustomSessionType } from '../make-api/my-custom-request';
import { CustomRequestWithContext } from '../make-api/requests/custom-request-with-context';
import { UserWithoutSensitiveData } from '../modules/user/user';
import { AppConfiguration } from './app-configuration';
 
export interface MyContext<T = {}> extends Record<string, unknown> {
  config: AppConfiguration
  currentUser?: UserWithAccessToken | UserWithoutSensitiveData | null | undefined;
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
  cache?: RequestCache
  id?: string
  cookies?: Record<string, string>
  signedCookies: Record<string, string>,
  get: (name: string) => string | undefined
  accepts: (types: string | string[]) => string[]
}  

export interface UserWithAccessToken  {
  id: string
  name: string
  email: string
  passwordHash: string//todo verify passwrd has needs to be undefined  here 
  roles: UserRole[]
  createdAt: Date
  updatedAt: Date
  accessToken: string
  userProfileId?: number 
  resetPasswordToken?: string | undefined
}
