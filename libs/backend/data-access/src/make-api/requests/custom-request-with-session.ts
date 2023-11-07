import { AppConfiguration } from '../../context/app-configuration';
import { CustomHeaders, HeadersWithIndexSignature } from '../../context/create-nested-context';
import { CustomContextType } from '../../context/custom-context-type';
import { CustomRequest } from '../../interfaces/user/custom-request';
import { UserWithoutSensitiveData } from '../../modules/user/user';
import { SessionData } from '../../types/express';
import { CustomHeadersImpl } from '../headers/custom-headers-impl';

export interface SharedHeaders<T extends SharedHeaders<T>> extends Headers{
  [key: string]: any
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

export interface CustomRequestWithSession<T> extends Omit<CustomRequest<T>, 'headers'> {
  [key: string]: any
  customHeaders: CustomHeadersImpl;
  config: AppConfiguration
  session: SessionData & { userId: string }
  cache: RequestCache
  context: T
  rawHeaders: string[] & readonly string[]
  headers: CustomHeaders
  
  accepts(): string[];
  accepts(type: string): string | false;
  accepts(types: string[]): string | false;
  ctx: {
    context: CustomContextType
    rawHeaders: string[] & readonly string[]
    headers: HeadersWithIndexSignature
    getAll: (name: string[]) => undefined
  }
  get: (name: string) => undefined
  cookies: Record<string, string>
  signedCookies: Record<string, string>
  accessToken: string | null
  currentUser?: UserWithoutSensitiveData | undefined | null
}
