import { PrismaClient, User } from '@prisma/client';
import { ExtendedCustomRequest } from '../interfaces/user/custom-request';
import { CustomRequestWithContext } from '../make-api/custom-request-with-context';
import { CustomSessionType } from '../make-api/my-custom-request';
import { UserWithoutSensitiveData } from '../modules/user/user';
import { AppConfiguration } from './app-configuration';

export interface MyContext<T = {}> extends Record<string, unknown> {
  config: AppConfiguration
  ctx?: any,
  req?: CustomRequestWithContext<MyContext<T>>['req'] & ExtendedCustomRequest<MyContext<T>>
  cookies?: Record<string, string>
  userId?: string | undefined
  accessToken?: string | undefined
  token?: string | null
  request?: Request | undefined
  prisma?: PrismaClient
  body?: any
  context: MyContext<MyContext<MyContext<{}>>>
  session: CustomSessionType
  accepts: (types: string | string[]) => string[]
  cache?: RequestCache
  id?: string
  signedCookies: Record<string, string>,
  get: (name: string) => string | undefined
  currentUser: UserWithAccessToken | UserWithoutSensitiveData | null;
}  

export interface UserWithAccessToken extends User {
  accessToken: string | null
}
