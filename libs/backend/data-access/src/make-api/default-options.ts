import { PrismaClient } from '@prisma/client'
import { NextFunction, Request } from 'express'
import { Application, ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import RangeParser from 'range-parser'
import { Socket } from 'socket.io'
import { AppConfiguration } from '../context/app-configuration'
import { MyContext } from '../context/my-context'
import { ExtendedCustomRequest } from '../interfaces/user/custom-request'
import { authenticationMiddlware, socket } from '../server'
import { SessionData } from '../types/express'
import { CustomContextHeaders, CustomRequestWithContext } from './custom-request-with-context'
import { CustomRequestWithSession } from './custom-request-with-session'
import { CustomSessionType, MyCustomRequest } from './my-custom-request'
import { specificSocket } from './socket/socket'


// Define the RequestOptions type
type RequestOptions = {
  headers: {
    [key: string]: string | string[];
  };
  baseURL: string;
  responseType: string;
  id: string;
  ctx: {
    headers: {
      [key: string]: string;
    };
    accessToken?: string;
  };
  // Add other properties you need
};





let myRequest: MyCustomRequest<MyContext> | null = null

function initializeCommonHeaders(socket: Socket): CustomContextHeaders {
  return {
    // Define a common headers object with default headers
    'Strict-Transport-Security': '',
    'X-Content-Type-Options': '',
    'X-Frame-Options': '',
    'X-XSS-Protection': '',
    'x-powered-by': '',
    'x-test-header': '',
    'Access-Control-Allow-Origin': '',
    Authorization: '',
    'Content-Type': '',
    Referer: '',
    'Referer-Policy': '',
  } as CustomContextHeaders
}

export let myContext: MyContext<{} | Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>> | undefined
let commonHeaders: CustomContextHeaders = {}

export function processRequest(req: Request, res: Response, next: NextFunction) {
  const socketId = 'yourSocketId'
  let specificSocket

  if (req) {
    // Initialize common headers
    if (specificSocket) {
      const commonHeaders: CustomContextHeaders = initializeCommonHeaders(specificSocket)
      specificSocket = socket.sockets.sockets.get(socketId)

      authenticationMiddlware(req, res, () => {
        if (myContext) {
          const myRequest = new MyCustomRequest<MyContext>(myContext)
          // Access and use the available methods and properties:
          const authorizationHeader = myRequest?.headers?.get('Authorization') // Access a specific header
          myRequest?.accept('application/json') // Check accepted content types

          // const isUnauthenticated = myRequest.isUnauthenticated() // Check if the request is unauthenticated
          myRequest?.customHeadersMethod('Custom-Header', 'new-value') // Set a custom header
          const acceptedEncoding = myRequest?.acceptsEncoding('gzip') // Check accepted encodings
          const acceptedCharset = myRequest?.acceptsCharset('utf-8') // Check accepted charsets
          const acceptedLanguage = myRequest?.acceptsLanguage('en-US') // Check accepted languages

          // Access request properties
          const url = myRequest?.url
          const method = myRequest?.method
          const headers = myRequest?.headers
          const body = myRequest?.body
          const sessionData = myRequest?.sessions // Session data
          const queryParameters = myRequest?.query
          const requestParams = myRequest?.params
          const cache = myRequest?.customCache
          const accessToken = myRequest?.accessToken
          // You can perform various operations using these methods and properties.
          // Add your logic based on your specific use case.
          next()
        } else {
          // Handle the case when myContext is null
          // You can add specific handling here, like setting a default value or throwing an error
          // Set default values or take any other appropriate actions
          if (myRequest) {
            myRequest.customHeadersMethod('Custom-Header', 'default-value')
            myRequest.setAcceptJson() // Set a default Accept header
            myRequest.handleError('DEFAULT_ERROR', 'Default error message', 500) // Handle a default error
            next()
          }

          console.error('myContext is null. Handle this case appropriately.')
          next(new Error('myContext is null'))
        }
      })
      myContext = {
        // Other properties in your context...
        config: {} as AppConfiguration,
        context: {} as MyContext<{}>,
        session: {} as CustomSessionType,
        signedCookies: {},
        get: (name: string) => undefined,
        cache: {} as RequestCache,
        headers: {
          accept: '',
        },
        req: req as CustomRequestWithSession<MyContext<{}>> &
          ExtendedCustomRequest<MyContext<{} | Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>>>,
        connection: socket,
        socket: socket,

        // Implementation of the 'accepts' method
        accepts: (types: string | string[] | undefined) => {
          if(req.headers === undefined){
            
          }
          const acceptHeader = req.headers?.get('accept') as string || '*/*'
            
          const results: string[] = []

          if (acceptHeader === '*/*') {
            if (typeof types === 'string') {
              results.push(types)
            } else if (Array.isArray(types)) {
              results.push(...types)
            }
          } else {
            if (typeof types === 'string' && acceptHeader.includes(types)) {
              results.push(types)
            } else if (Array.isArray(types)) {
              for (const type of types) {
                if (acceptHeader?.includes(type)) {
                  results.push(type)
                }
              }
            }
          }
          return results
          
        },
      }
    }
  }
}

// Define a function to glenerate default Axios request options
export function getDefaultAxiosOptions(req: CustomRequestWithContext<MyContext<{}>>) {
  // Determine if the request is an API request
  const isApiRequest = req.headers?.referer?.includes(`${req.headers?.origin}/api/`)

  // Retrieve accessToken from the request object
  const { accessToken } = req


  const commandHeaders = {
    accept: ''
  }
  // Define the options object with the necessary headers
  const options: RequestOptions = {
    headers: {
      // Spread the properties of common headers
      ...commonHeaders,
      // Add the x-poser-by header
      'x-powered-by': 'test-server',
      // Add the x-test-header header
      'x-test-header': 'true',
      // Add the access-control-allow-origin header
      'Access-Control-Allow-Origin': '*',
      // Add the authorization header
      Authorization: `Bearer ${accessToken || ''}`,
      // Add the content-type header
      'Content-Type': 'application/json',
      // Define default options for the range parser
      'Client-IP': specificSocket?.handshake?.address || '',
      // Define session storage for user session information
      sessionStore: sessionStorage.Store,
      // Add the referer header if it is an API request
      ...(isApiRequest && { Referer: req.headers?.referer }),
      // Add the request-policy header if it is an API request
      ...(isApiRequest && { 'Referer-Policy': 'strict-origin-when-cross-origin' }),
      'set-cookie': [],
      accept: '',
      'accept-language': '',
      'accep-patch': '',
      'accept-range': '',
    },

    baseURL: process.env.API_URL || '',
    responseType: 'json',
    id: '',
    ctx: {
      headers: { ...commonHeaders },
      accessToken: accessToken,
    },
    prisma: new PrismaClient(),
    req: {
      session: {} as SessionData,
      cache: {} as RequestCache, //todo verify cache
      context: {} as CustomRequestWithContext<MyContext<{}>>,
      get: function (name: string): undefined {
        throw new Error('Function not implemented.')
      },
      cookies: {},
      signedCookies: {},
    },
    context: {} as MyContext<{}>,
    body: {},
    token: '',
    session: {} as SessionData,
    rawHeaders: [],
    cookies: {},
    cache: {} as RequestCache,
    credentials: 'include',
    userId: undefined,
    request: {} as Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    get: function (name: string | string): string | undefined {
      throw new Error('Function not implemented.')
    },
    getAll: (function (name: string): string[] | undefined {
      throw new Error('Function not implemented.')
    }),
    signedCookies: {},
    [Symbol.asyncIterator]: function (): AsyncIterableIterator<any> {
      throw new Error('Function not implemented.')
    },
    header: function (name: 'set-cookie'): string[] | undefined {
      throw new Error('Function not implemented.')
    },
    accepts: function (): string[] {
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
    range(size: number, options?: RangeParser.Options): RangeParser.Ranges| RangeParser.Range | RangeParser.Result | undefined{
      //provide a valid 'str' argument. You may need to specify the appropiate 
      //striing for your usecase
      const str = 'sample-range-header'
      return  RangeParser(size, str, options)
    },
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
    trailers: {},
    rawTrailers: [],
    setTimeout: function (
      msecs: number,
      callback?: (() => void) | undefined,
    ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
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
      throw new Error('Function not implemented.')
    },
    read: function (size?: number | undefined) {
      throw new Error('Function not implemented.')
    },
    setEncoding: function (
      encoding: BufferEncoding,
    ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
      throw new Error('Function not implemented.')
    },
    pause: function (): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
      throw new Error('Function not implemented.')
    },
    resume: function (): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
      throw new Error('Function not implemented.')
    },
    isPaused: function (): boolean {
      throw new Error('Function not implemented.')
    },
    unpipe: function (
      destination?: NodeJS.WritableStream | undefined,
    ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
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
    addListener: function (event: 'data', listener: (chunk: any) => void): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
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
    pipe: function <T extends NodeJS.WritableStream>(
      destination: T,
      options?: { end?: boolean | undefined } | undefined,
    ): T {
      throw new Error('Function not implemented.')
    },
    off: function (
      eventName: string | symbol,
      listener: (...args: any[]) => void,
    ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
      throw new Error('Function not implemented.')
    },
    removeAllListeners: function (
      event?: string | symbol | undefined,
    ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
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
    sessionStore: sessionStorage.Store,
  }

  interface MyContextHeaders {
    accept?: string
  }

  // Helper functions for 'accepts' method
  function acceptSingle(type: string, acceptHeader: string | undefined): string | false {
    if (acceptHeader && acceptHeader.includes(type)) {
      return type
    }
    return false
  }

  function acceptMultiple(types: string[], acceptHeader: string | undefined): string | false {
    for (const type of types) {
      if (acceptHeader && acceptHeader.includes(type)) {
        return type
      }
    }
    return false
  }

  return options
}
