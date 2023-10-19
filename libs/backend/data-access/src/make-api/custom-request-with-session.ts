import { CustomHeaders, HeadersWithIndexSignature } from '../context/create-nested-context';
import { CustomRequest } from '../interfaces/user/custom-request';
import { SessionData } from '../types/express';

export interface SharedHeaders<T extends SharedHeaders<T>> extends Headers{
  [key: string]:
  | string
  | string[]
  | undefined
  | ((name: string, value: string) => void)
  | ((callbackFn: (value: string, name: string, headers: Headers) => void, thisArg?: any) => void)

  authorization?: string;
  append(name: string, value?: string): T;
  has(name: string): boolean;
  get(name: string): string | null;
  delete(name: string): boolean;
  keys(): IterableIterator<string>;
  entries(): IterableIterator<[string, string]>;
  [Symbol.iterator](): IterableIterator<[string, string]>;
  getAll(name: string): string[];
  values(): IterableIterator<string>;
  getSetCookie(): string[]
}


export type CustomRequestSessionHeaders = ()=>{} & {
  set: (name: string, value: string) => CustomRequestSessionHeaders;
}

export interface CustomRequestWithSession<T> extends Omit<CustomRequest<T>, 'headers'> {
  customHeaders: import("/Users/dixiejones/Development/main-app/appository-react/libs/backend/data-access/src/make-api/headers/custom-headers-impl").CustomHeadersImpl;
  session: SessionData & { userId: string }
  cache: any
  context: T
  rawHeaders: string[] & readonly string[]
  headers: CustomHeaders
  accepts: {
    (type: string): string | false;
    (types: string[]): string | false;
    (types: string[]): string[] | false;
    (): string[];
  }
  ctx: {
    context: {}
    rawHeaders: string[] & readonly string[]
    headers: HeadersWithIndexSignature
    getAll: (name: string) => undefined
  }
  get: (name: string) => undefined
  cookies: any
  signedCookies: any
}
