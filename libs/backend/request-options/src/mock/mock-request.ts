
import { MyContext, createNestedContext } from '@appository/backend/context-system'
import { UserWithAccessToken, UserWithoutSensitiveData } from '@appository/backend/users'
import { PrismaClient } from '@prisma/client'
import { Application, Dictionary, ParamsDictionary, Request } from 'express-serve-static-core'
import {
  convertUserToUserWithAccessToken,
  initalizeUser
} from 'libs/backend/data-access/src/interfaces/auth/authenticate'
import { ParsedQs } from 'qs'
import { socket } from '../../../data-access/src/server'
import { CustomRequest, getHeaderValue } from '../custom-requests/custom-request'
import { CustomRequestWithContext } from '../custom-requests/custom-request-with-context'
import { CustomSessionType } from '../custom-requests/my-custom-request'

const currentUser: UserWithAccessToken = convertUserToUserWithAccessToken(initalizeUser());

// // Generate an access token using the generateToken() function
// const accessToken = generateToken(currentUser);

const customSessionType = {} as CustomSessionType  

export const mockRequest = <T>(context?: MyContext<T>): CustomRequestWithContext<MyContext<MyContext<T>>> => {
  const nestedContext = createNestedContext(context || ({} as MyContext<T>))
  const request: CustomRequestWithContext<MyContext<MyContext<T>>> = {
    ...customSessionType,
    id: currentUser.id,
    customProp: currentUser.customProp,
    prismaService: currentUser.prismaService,
    user: currentUser,
    status: currentUser.status,
    currentUser: currentUser,
    ctx: nestedContext.ctx,
    accessToken: 'test-token',
    prisma: {} as PrismaClient,
    req: {} as CustomRequest,
    body: {} as BodyInit | null | undefined,
    token: 'test-token',
    session: {} as CustomSessionType,
    rawHeaders: [],
    cookies: {},
    cache: {} as RequestCache,
    destination: {} as RequestDestination,
    headers: {
      authorization: 'Bearer test-token',
    },
    get(...name: (string | string[])[]): string | string[] | undefined {
      const headers = name.map((headerName) => {
        if (Array.isArray(headerName)) {
          return headerName.map((header) => getHeaderValue(request.headers, header)).filter(Boolean);
        } else {
          return getHeaderValue(request.headers, headerName);
        }
      }).filter(Boolean);
    
      if (headers.length === 0) {
        return undefined;
      }
    
      if (headers.length === 1) {
        // If there's only one header, return it as a string
        return headers[0] as string;
      }
    
      // If there are multiple headers, return them as an array of strings
      return headers as string[];
    },
  
    getAll(name: string | string[]): string[] | undefined {
      const headerNames = Array.isArray(name) ? name : [name]
      return headerNames.map((headerName) => getHeaderValue(request.headers, headerName)).filter(Boolean) as string[] |
        undefined
    },
    config: {
      enableVideo: false,
      enableAudio: false,
      defaultUserRole: 'USER',
      userRoles: [],
      allowRegistration: false,
      requireEmailVerification: false,
      allowPublicRooms: false,
      allowPrivateRooms: false,
      enableModeration: false,
      moderatorRoles: [],
      allowFileUploads: false,
      maxFileSize: 0,
      enableNotifications: false,
      restrictAccessByLocation: false,
      allowedLocations: []
    },
    // destination: '',
    context: {} as MyContext<UserWithoutSensitiveData>,
    request: {} as CustomRequest,
    signedCookies: {} as CustomRequestWithContext<MyContext<MyContext<T>>>,
    [Symbol.asyncIterator]: function (): AsyncIterableIterator<any> {
      throw new Error('Function not implemented.')
    },
    header: function (name: 'set-cookie'):  string[] | undefined {
      throw new Error('Function not implemented.')
    },

    accepts: function (): string | false {
      throw new Error('Function not implemented.')
    },
    acceptsCharsets: function (): string[] {
      throw new Error('Function not implemented.')
    },
    
    acceptsEncodings: function (): string[] {
      throw new Error('Function not implemented.')
    },
    acceptsLanguages: function (): string[] {
      throw new Error('Function not implemented.')
    },
    // range(size: number, options?: RangeParserOptions): RangeParserRanges.Options | RangeParserResult | undefined,
    accepted: [],
    param: function (name: string, defaultValue?: any): string {
      throw new Error('Function not implemented.')
    },
    is: function (type: string | string[]): string | false | null {
      throw new Error('Function not implemented.')
    },
    protocol: '',
    secure: false,
    ip: '',
    ips: [],
    subdomains: [],
    path: '',
    hostname: '',
    host: '',
    fresh: false,
    stale: false,
    xhr: false,
    method: '',
    params: {} as ParamsDictionary,
    query: {} as ParsedQs,
    route: undefined,
    originalUrl: '',
    url: '',
    baseUrl: '',
    app: {} as Application<Record<string, any>>,
    aborted: false,
    httpVersion: '',
    httpVersionMajor: 0,
    httpVersionMinor: 0,
    complete: false,
    connection: socket,
    socket: socket,
    trailers: {} as Dictionary<string>,
    rawTrailers: [],
    setTimeout: function (_msecs: number, callback?: (() => void) | undefined): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
      throw new Error('Function not implemented.')
    },
    destroy: function (error?: Error | undefined): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
      throw new Error('Function not implemented.')
    },
    readableAborted: false,
    readable: false,
    readableDidRead: false,
    readableEncoding: null,
    readableEnded: false,
    readableFlowing: null,
    readableHighWaterMark: 0,
    readableLength: 0,
    readableObjectMode: false,
    destroyed: false,
    closed: false,
    errored: null,
    _read: function (size: number): void {
      // implement method


        },
    
      read: function (size?: number | undefined) {
          return Promise.resolve(Buffer.alloc(0))
            },
      setEncoding: function (encoding: BufferEncoding): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      pause: function (): Request{
        throw new Error('Function not implemented.')
      },
      resume: function (): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      isPaused: function (): boolean {
        throw new Error('Function not implemented.')
      },
      unpipe: function (destination?: NodeJS.WritableStream | undefined): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      unshift: function (chunk: any, encoding?: BufferEncoding | undefined): void {
        throw new Error('Function not implemented.')
      },
      wrap: function (stream: NodeJS.ReadableStream): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      push: function (chunk: any, encoding?: BufferEncoding | undefined): boolean {
        throw new Error('Function not implemented.')
      },
      _destroy: function (error: Error | null, callback: (error?: Error | null | undefined) => void): void {
        throw new Error('Function not implemented.')
      },
      addListener: function (event: 'close', listener: () => void): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      emit: function (event: 'close'): boolean {
        throw new Error('Function not implemented.')
      },
      on: function (event: 'close', listener: () => void): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      once: function (event: 'close', listener: () => void): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      prependListener: function (event: 'close', listener: () => void): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      prependOnceListener: function (event: 'close', listener: () => void): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      removeListener: function (event: 'close', listener: () => void): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      pipe: function <T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean | undefined } | undefined): T {
        throw new Error('Function not implemented.')
      },
      off: function (eventName: string | symbol, listener: (...args: any[]) => void): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      removeAllListeners: function (event?: string | symbol | undefined): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      setMaxListeners: function (n: number): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      getMaxListeners: function (): number {
        throw new Error('Function not implemented.')
      },
      listeners: function (eventName: string | symbol): Function[] {
        throw new Error('Function not implemented.')
      },
      rawListeners: function (eventName: string | symbol): Function[] {
        throw new Error('Function not implemented.')
      },
      listenerCount: function (eventName: string | symbol): number {
        throw new Error('Function not implemented.')
      },
      eventNames: function (): (string | symbol)[] {
        throw new Error('Function not implemented.')
      },
    sessionID: '',
    sessionStore: sessionStorage.Store
  }
  return request
}

export default mockRequest
