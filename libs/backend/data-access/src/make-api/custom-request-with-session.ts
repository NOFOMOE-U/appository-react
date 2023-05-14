import { CustomHeaders, HeadersWithIndexSignature } from '../context/create-nested-context';
import { CustomRequest } from '../interfaces/user/custom-request';
import { SessionData } from '../types/express';

export interface SharedHeaders {
  [key: string]
  : string
  | string[]
  | undefined
  | ((name: string, value: string) => void)
  | ((callbackFn: (value: string, name: string, headers: Headers) => void, thisArg?: any) => void)

  authorization?: string;
  append(name: string): string;
  has(name: string): boolean;
  get(name: string): string | null;
  delete(name: string): boolean;
  keys(): IterableIterator<string>;
  entries(): IterableIterator<[string, string]>;
  [Symbol.iterator](): IterableIterator<[string, string]>;
  getAll(name: string): string[];
}


export type CustomRequestSessionHeaders = SharedHeaders & {
  set(name: string, value: string): CustomRequestSessionHeaders;
}

export interface CustomRequestWithSession<T> extends CustomRequest<T> {
  
  session: SessionData & { userId: string }
  cache: any
  context: T
  rawHeaders: string[] & readonly string[]
  headers: CustomHeaders 
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
