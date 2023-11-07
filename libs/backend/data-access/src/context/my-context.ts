import { PrismaClient } from '@prisma/client';
import { IncomingMessage } from 'http';
import { URLSearchParams } from 'url';
import { CustomSessionType } from '../make-api/my-custom-request';
import { BodyContent, CustomRequestInit } from '../make-api/requests/custom-request-init';
import { YourRequestObject } from '../make-api/requests/custom-request-with-context';
import { UserWithAccessToken, UserWithoutSensitiveData } from '../modules/user/user';
import { AppConfiguration } from './app-configuration';
import { CustomContextType } from './custom-context-type';

export interface CustomURLSearchParams extends URLSearchParams {
  append: (key: string, value: string) => void;
  delete: (name: string) => void;
  get:(name: string) => string | null
  getAll: (name: string) => string[];
  has: (name: string) => boolean;
  set: (name: string, value: string) => void;
  sort: () => void;
  forEach(callback: (value: string, name: string, searchParams: CustomURLSearchParams) => void): void;
  entries(): IterableIterator<[string, string]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<string>;
  getSetCookie(): string[];
  [Symbol.iterator](): IterableIterator<[string, string]>;
  }



export interface MyContext<T = {}> extends Record<string, unknown> {
  config?: AppConfiguration
  currentUser?: UserWithAccessToken | UserWithoutSensitiveData | null | undefined;
  ctx: CustomContextType;
  user: UserWithAccessToken
  req?: IncomingMessage
  request: YourRequestObject<CustomRequestInit>
  body: BodyInit | null | undefined;
  requestBody: BodyContent | null | undefined 
  userId?: string | undefined | null
  accessToken: string | null
  prisma?: PrismaClient
  url: string
  session: CustomSessionType
  cache?: RequestCache
  id?: string
  cookie?: string
  token?: string
  size: number
  entries: () => IterableIterator<[string, string]>
  keys: () => IterableIterator<string>;
  values: () => IterableIterator<string>;
  append: (key: string, value: string) => void
  has:  (key: string) => boolean
  set: (key: string, value: string) => void
  sort: (key: string, value: string) => void
  forEach: (callback: (value: string, name: string, parent?: Headers | CustomURLSearchParams | undefined) => void) => void
  delete: (name: string) => void
  getAll: (name: string[]) => string[]
  cookies?: Record<string, string>
  signedCookies: Record<string, string>,
  get?: (name: string) => string | null | undefined
  accepts: (types: string | string[]) => string[]
  URLSearchParams: CustomURLSearchParams
  [Symbol.iterator](): IterableIterator<[string, string]>;
}  

const myContext = {} as MyContext
const myContextInstance = myContext
myContextInstance[Symbol.iterator] = function* () {
  for (const [key, value] of Object.entries(this)) {
    if (typeof value === 'string') {
      yield [key, value]
    }
  }
}
