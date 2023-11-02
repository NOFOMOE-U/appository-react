import { PrismaClient } from '@prisma/client';
import { ExtendedCustomRequest } from '../interfaces/user/custom-request';
import { CustomSessionType } from '../make-api/my-custom-request';
import { CustomRequestWithContext } from '../make-api/requests/custom-request-with-context';
import { UserWithoutSensitiveData } from '../modules/user/user';
import { AppConfiguration } from './app-configuration';
 


export type UserWithAccessToken = UserWithoutSensitiveData &  {
  accessToken: string 
  passwordHash: string | undefined;
  resetPasswordToken: string | undefined;
  userProfileId?: number
  username: string
  }

export interface MyContext<T = {}> extends Record<string, unknown> {
  config?: AppConfiguration
  currentUser?: UserWithAccessToken | UserWithoutSensitiveData | null | undefined;
  ctx: any,
  req?: CustomRequestWithContext<MyContext<T>>['req'] & ExtendedCustomRequest<MyContext<T>>
  userId?: string | undefined | null
  accessToken: string | undefined
  request?: Request | undefined
  prisma?: PrismaClient
  body?: any
  context: MyContext 
  session: CustomSessionType
  cache?: RequestCache
  id?: string
  cookie?: string
  token?: string
  cookies?: Record<string, string>
  signedCookies: Record<string, string>,
  get: (name: string) => string | undefined
  accepts: (types: string | string[]) => string[]
}  
