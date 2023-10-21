//TODO
// session Property:

// Benefit: Storing the session property in your request object allows you to access session-related data for the user making the request. Sessions are often used to maintain user authentication state and store user-specific data throughout a user's interaction with your application. It can be beneficial for managing user sessions and keeping user-related data secure and consistent across requests.

// Security Considerations: The security of sessions depends on how they are implemented and managed. To enhance security:

// Use secure and random session IDs.
// Store sensitive user data on the server, not in the session.
// Implement session timeout and session regeneration.
// Protect against session fixation attacks.
// signedCookies Property:

// Benefit: The signedCookies property typically contains data stored in cookies that have been signed to ensure their integrity and authenticity. This can be beneficial for transmitting and receiving data between the client and server while ensuring that the data has not been tampered with during transit.

// Security Considerations: Using signed cookies enhances security by preventing malicious users from modifying the data stored in cookies. Here are some considerations:

// Use a strong and secret signing key for cookie signing.
// Verify the signature of incoming cookies to ensure they haven't been tampered with.
// Avoid storing sensitive data directly in cookies, even if they are signed.

import { Request } from 'express'
import { Application, Dictionary, ParamsDictionary } from 'express-serve-static-core'
import { Session } from 'express-session'
import { IncomingHttpHeaders } from 'http'
import { ParsedQs } from 'qs'

import { Cookie } from 'tough-cookie'
import { CustomHeaders } from '../context/create-nested-context'
import { CustomContextType } from '../context/custom-context-type'
import { MyContext } from '../context/my-context'
import prisma from '../lib/prisma/prisma'
import errorMessages from '../middleware/permissions/error-messages'
import { UserWithoutSensitiveData } from '../modules/user/user'
import { SessionData } from '../types/express'
import { CustomContextHeaders, CustomRequestWithContext } from './custom-request-with-context'
import { CustomRequestWithSession } from './custom-request-with-session'
import { getDefaultAxiosOptions } from './default-options'; // Import the getDefaultAxiosOptions function
import { CustomHeadersHandler } from './headers/custom-headers'
import { CustomHeadersImpl } from './headers/custom-headers-impl'
import { socket } from './socket/socket'

export type CustomSessionType = {
  userId: string
  username: string
  expires: number
}
export interface CustomRequestInit extends RequestInit {
  url?: string
  query?: ParsedQs
  params?: { [key: string]: string }
  get?: (name: string) => string | null | undefined
  accepts: (types: string | string[]) => string[]
  customCache?: RequestCache
  session: CustomSessionType 
  body?: BodyInit | undefined
  signedCookies?: { [key: string]: string }
  context?: CustomContextType
}

export interface CustomRequestInitWithGet extends CustomRequestInit {
  get?: (name: string) => string | null | undefined
}

export interface MyHeaders extends CustomHeaders {
  [key: string]:
    | string
    | string[]
    | ((name: string, value: string) => void)
    | ((callbackFn: (value: string, name: string, headers: Headers) => void, thisArg?: any) => void)
    | undefined
}

// Define a custom implementation of CustomHeaders that wraps Headers

interface RequestCache {
  // Define the properties and their types here
  [key: string]: any
}

type CustomHeadersAndHeaders = CustomHeaders & IncomingHttpHeaders

const customContextHeaders: CustomContextHeaders = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer token',
  'Custom-Header': ['value1', 'value2'],
}

customContextHeaders['Content-Type'] = 'application/json'
customContextHeaders['Authorization'] = 'Bearer token'
customContextHeaders['Custom-Header'] = 'value1'
customContextHeaders['Custom-Header'] = 'value2'

export type MyHeadersInit = {[key: string]: string | string[] };

export class MyCustomHeaders extends CustomHeadersHandler {
  constructor(headers?: MyHeadersInit | undefined) {
    super(headers)
    if (headers && typeof headers === 'object') {
      //iterate over the object properties
      for (const key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          const value = headers[key];

          if (typeof value == 'string') {
            this.set(key, value)
          } else if (Array.isArray(value)) {
            value.forEach((val) => this.append(key,val))
          }
        }
      }
    }
  }

    
    setAuthorization(token: string) {
    this.set('Authorization', `Bearer ${token}`)
  }

  setAcceptJson() {
    this.set('Accept', 'application/json') // change ''application/json' with values
  }

  has(name: string): boolean {
    return super.has(name)
  }

  get(name: string): string | null {
    return super.get(name)
  }

  set(name: string, value: string | string[]): this {
    if (typeof value === 'string') {
      this.set(name, value)
    } else if (Array.isArray(value)) {
      value.forEach((val) => this.append(name, val))
    }
    return this
  }

  delete(name: string): boolean {
    super.delete(name)
    return true
  }

  getCustomHeader(): string | null {
    return this.get('custom-header')
  }

  append(name: string, value?: string | undefined): CustomHeadersHandler {
    return super.append(name, value);
  }

  keys(): IterableIterator<string> {
    return this.keys()
  }

  entries(): IterableIterator<[string, string]> {
    return this.entries()
  }

  values(): IterableIterator<string> {
    return this.values()
  }

  getAll(name: string): string[] {
    return this.getAll(name)
  }

  *[Symbol.iterator](): IterableIterator<[string, string]> {
    const entries: [string, string][] = []
    for (const key in Headers) {
      if (Object.prototype.hasOwnProperty.call(this.headers, key)) {
        entries.push([key, this.get(key) || ''])
      }
    }
    return entries[Symbol.iterator]()
  }

  // [name: string]: 
    // | string
    // | string[]
    // | ((name: string, value: string) => void)
    // | ((callbackFn: (value: string, name: string, headers: CustomHeadersHandler) => void, thisArg?: any) => void)
    // | undefined
}

export class MyCustomRequest<T extends MyContext<UserWithoutSensitiveData>>
  extends Request
  implements CustomRequestWithSession<MyContext>
{

  
  customHeaders: MyCustomHeaders = new MyCustomHeaders()
  headers: MyCustomHeaders = new MyCustomHeaders()

  //error handling
  handleError(errorCode: string, message: string, status: number) {
    const errorMessage = errorMessages[errorCode] || message

    if (this.headers instanceof Headers) {
      const newHeaders = new Headers(this.headers)
      newHeaders.set('Content-Type', 'application/json')
      // (this.headers as CustomHeaders).set('Content-Type', 'application/json') // Set response content type
    }
    // You can customize the error response structure as needed
    const errorResponse = {
      error: {
        code: errorCode,
        message: errorMessage,
      },
    }

    // Create a new response with the error details
    const response = new Response(JSON.stringify(errorResponse), {
      status,
    })

    // Throw the response as an error to be caught by the error handling middleware
    throw response
  }
  // add the 'session' property
  sessions: SessionData & { userId: string } = { userId: '' }
  query: ParsedQs = {}
  params: { [key: string]: string }
  body: any
  customCache: RequestCache = {}
  customHeadersProperty: Headers

  constructor(options: CustomRequestInit & { body?: MyContext }) {
    if (!options.url) {
      throw new Error('URL is required')
    }
    super(options.url, options)

    // Set the 'url' and 'method' properties
    this.url = options.url;
    this.method = options.method || 'GET'; // You can provide a default method if needed

    this.headers = new CustomHeadersImpl({})


    //set ur
    const customHeaderValues = ['value1', 'value2']
    this.customHeadersProperty = new Headers()
    // set custom headers as needed
    this.customHeaders.setAuthorization('your-token') // change to auth token
    this.customHeaders.setAcceptJson()
    // Set custom headers as needed directly on the headers property
    this.customHeadersProperty.set('Content-Type', 'application/json')
    this.customHeadersProperty.set('Authorization', 'Bearer token')
    for (const value of customHeaderValues) {
      this.customHeadersProperty.set('Custom-Header', value)
    }

    const headers = new Headers()
    headers.set('Content-Type', 'application/json'),
      headers.set('Authorization', 'Bearer token '),
      headers.append('Custom-Header', 'value1'),
      headers.append('Custom-Header', 'value2')

    // Define headers
    const customHeadersImpl = new CustomHeadersImpl({
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
      'Custom-Header': ['value1', 'value2'],
    })

    // Create an instance of Headers for the 'set-cookie' header
    const setCookieHeader = new CustomHeadersImpl({ 'set-cookie': '' })
    // setCookieHeader.set('set-cookie', '');

    // Create a partial Request object with the necessary properties
    const partialRequest: Partial<Request> = {
      method: 'GET', // Add any other required properties here
      url: 'https://example.com',
    }

    type LocalMyContext = MyContext
    const requestContext: CustomRequestWithContext<LocalMyContext> = {
      ...new Request(options.url),
      context: options.body as MyContext,
      method: 'GET',
      ...partialRequest,
      id: '',
      ctx: {},
      prisma: prisma,
      req: {
        session: SessionData,
        cache: {},
        context: {},
        get: function (name: string): undefined {
          throw new Error('Function not implemented.')
        },
        cookies: undefined,
        signedCookies: undefined,
      },
      token: '',
      session: {} as Session & Partial<SessionData>,
      rawHeaders: [],
      cookies: {},
      userId: undefined,
      request: {},
      // get: function (name: string): string | undefined {
      //   throw new Error('Function not implemented.')
      // },
      getAll: function (name: string): string[] | undefined {
        throw new Error('Function not implemented.')
      },
      signedCookies: {} as Record<string, string>,
      [Symbol.asyncIterator]: function (): AsyncIterableIterator<any> {
        throw new Error('Function not implemented.')
      },
      getCustomHeader(): string | null {
        return this.customHeaders.getCustomHeader()
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
      params: {} as ParamsDictionary,
      query: {} as ParsedQs,
      route: undefined,
      originalUrl: '',
      baseUrl: '',
      app: {} as Application,
      aborted: false,
      httpVersion: '',
      httpVersionMajor: 0,
      httpVersionMinor: 0,
      complete: false,
      connection: socket,
      socket: socket,
      trailers: {} as Dictionary<string>,
      rawTrailers: [],
      setTimeout: function (
        msecs: number,
        callback?: (() => void) | undefined,
      ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      destroy: function (
        error?: Error | undefined,
      ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
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
      wrap: function (
        stream: NodeJS.ReadableStream,
      ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      push: function (chunk: any, encoding?: BufferEncoding | undefined): boolean {
        throw new Error('Function not implemented.')
      },
      _destroy: function (error: Error | null, callback: (error?: Error | null | undefined) => void): void {
        throw new Error('Function not implemented.')
      },
      // myCustomRequest.addListener('close', () => {
      //   throw new Error('Function not implemented.')
      // }),
     
      // emit: function (event: 'close'): boolean {
      //   throw new Error('Function not implemented.')
      // },
      // on: function (
      //   event: 'close',
      //   listener: () => void,
      // ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
      //   throw new Error('Function not implemented.')
      // },
      // once: function (
      //   event: 'close',
      //   listener: () => void,
      // ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
      //   throw new Error('Function not implemented.')
      // },
      // prependListener: function (
      //   event: 'close',
      //   listener: () => void,
      // ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
      //   throw new Error('Function not implemented.')
      // },
      // prependOnceListener: function (
      //   event: 'close',
      //   listener: () => void,
      // ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
      //   throw new Error('Function not implemented.')
      // },
      // removeListener: function (
      //   event: 'close',
      //   listener: () => void,
      // ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
      //   throw new Error('Function not implemented.')
      // },
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

    // use getDefaulAxiosOptions to get default headers
    const defaultHeaders = getDefaultAxiosOptions(requestContext).headers

    this.query = {}
    this.params = {}

    if (options.body !== undefined && options.body !== null) {
      this.body = options.body
    } else {
      this.body = null
    }

    const combinedHeaders = new Headers()
    // Copy properties from CustomHeadersImpl
    for (const [key, value] of Object.entries(customHeadersImpl)) {
      if (typeof value === 'function') {
        //ensure that we have a valid header value before attempting to set it
        const boundValue = value.bind(setCookieHeader)
        if (typeof boundValue === 'string') {
          combinedHeaders.set(key, boundValue)
        }
      } else {
        combinedHeaders.set(key, value as string)
      }
    }

    // Copy properties from setCookieHeader
    for (const [key, value] of Object.entries(setCookieHeader)) {
      if (typeof value === 'function') {
        const boundValue = value.bind(setCookieHeader)
        if (typeof boundValue === 'string') {
          combinedHeaders.append(key, boundValue)
        }
      } else {
        combinedHeaders.set(key, value as string)
      }
    }

    // Create custom headers object
    const customHeaders: typeof customHeadersImpl = new CustomHeadersImpl({
      Header1: 'Value1',
      Header2: 'Value2',
    })
    const customRequest: CustomRequestWithSession<MyContext> = new MyCustomRequest<CustomRequestWithSession<MyContext<{}>>>(options)
    customRequest.customHeaders = customHeaders

    // Assign it to the main headers
    this.headers = customHeaders
  }

  session: SessionData & { userId: string } = { userId: '' }
  context?: any = {}
  // headers: CustomHeaders = new CustomHeadersImpl({}) // initiaze with empty headers
  cookies: Record<string, string> = {}
  signedCookies: Record<string, string> = {}
  // body: MyContext = {} as MyContext
  url: string = ''
  method: string = ''
  // cache: Record<string, any> = {}
  ctx: any = {} // adjust the type as needed
  accessToken: string | undefined = undefined

  // Add missing properties and methods
  rawHeaders: string[] = []
  push: (chunk: any, encoding?: BufferEncoding | undefined) => boolean = (
    chunk: any,
    encoding?: BufferEncoding | undefined,
  ) => false
  unshift: (chunk: any) => void = (chunk: any) => {};
  [Symbol.asyncIterator]: () => AsyncIterableIterator<any> = async function* () {}

  async fetch(): Promise<Response> {
    const fetchOptions: RequestInit = {
      method: this.method,
      headers: this.headers as unknown as HeadersInit,
      body: this.body ? JSON.stringify(this.body) : null,
    }
    return fetch(this.url, fetchOptions)
  }

  get(name: string): undefined

  get(name: string, value?: string | string[] | undefined): string | undefined {
    if (value !== undefined) {
      if (name === 'set-cookie') {
        if (typeof value === 'string') {
          value = [value]
        }
        const cookies = value.map((v) => Cookie.parse(v))
        const cookieString = cookies
          .map((cookie) => cookie?.toString())
          .filter((cookie) => !!cookie) // filter out potentionally undefined values
          .join(';')
        if (cookieString) {
          this.headers.append(name, cookieString)
        }
      } else {
        if (typeof value === 'string') {
          this.headers.set(name, value)
        } else {
          this.headers.set(name, value.join(', '))
        }
      }
    }
    return this.headers.get(name) ?? undefined
  }

  has(name: string): boolean {
    return this.headers.has(name)
  }

  set(name: string, value: string | string[]): this {
    if (typeof value === 'string') {
      this.headers.set(name, value)
    } else if (Array.isArray(value)) {
      value.forEach((val) => this.headers.append(name, val))
    }
    return this
  }

  accept(typeOrTypes: string | string[]): string | false {
    const accept = this.headers?.get('accept') ?? ''

    if (!accept || accept === '*/*') {
      if (typeof typeOrTypes === 'string') {
        return typeOrTypes
      } else if (Array.isArray(typeOrTypes)) {
        return typeOrTypes[0] || false
      }
    }

    if (typeof typeOrTypes === 'string') {
      return this.acceptSingle(typeOrTypes, accept)
    } else if (Array.isArray(typeOrTypes)) {
      return this.acceptMultiple(typeOrTypes, accept)
    }
    return false
  }

  // accepts(typeOrTypes: string | string[]): string | false | string[]{
  //   const acceptHeader = this.get('accept') || '*/*'

  //   if (typeof typeOrTypes === 'string') {
  //     if (acceptHeader.includes(typeOrTypes)) {
  //       return typeOrTypes
  //     } else {
  //       return false
  //     }
  //   } else if (Array.isArray(typeOrTypes)) {
  //     const results: string[] = typeOrTypes.filter((type) => acceptHeader.includes(type))
  //     return results.length > 0 ? results : false
  //   } else {
  //     return false
  //   }
  // }

  private acceptSingle(type: string, acceptHeader: string | null): string | false {
    if (acceptHeader && acceptHeader.includes(type)) {
      return type
    }
    return false
  }

  private acceptMultiple(types: string[], acceptHeader: string | null): string | false {
    for (const type of types) {
      if (acceptHeader && acceptHeader.includes(type)) {
        return type
      }
    }
    return false
  }

  setAcceptJson() {
    this.customHeaders.set('Accept', 'application/json')
  }
  customHeadersMethod(name: string, value?: string | string[]): this | string[] {
    if (!name) {
      if (this.headers) {
        const headerArray: string[] = []
        this.headers.forEach((value, key) => headerArray.push(`${key}: ${value}`))
        return headerArray
      } else {
        return []
      }
      // Default implementation when no arguments are provided
    }
    if (name === 'set-cookie') {
      if (value === undefined) {
        const setCookieHeaderValue = this.headers.get('set-cookie')
        return setCookieHeaderValue ? setCookieHeaderValue.split('; ') : []
      }
      // Handle 'set-cookie' header differently by appending multiple cookies
      if (Array.isArray(value)) {
        for (const v of value) {
          this.headers.append('set-cookie', v as string)
        }
      } else {
        this.headers.append('set-cookie', value as string)
      }
      return this
    } else if (value !== undefined) {
      this.headers.set(name, value as string)
      return this
    }
    if (this.headers) {
      const headerArray: string[] = []
      this.headers.forEach((value, key) => {
        headerArray.push(`${key}: ${value}`)
      })
      return headerArray
    } else {
      return []
    }
  }

  acceptsEncoding: (encodings: string | string[]) => string | false = (encodings: string | string[]) => {
    const acceptEncoding = this.headers.get('accept-encoding')
    if (!acceptEncoding || acceptEncoding === '*') {
      return typeof encodings === 'string' ? encodings : encodings[0]
    }
    if (typeof encodings === 'string') {
      encodings = [encodings]
    }
    for (let i = 0; i < encodings.length; i++) {
      if (acceptEncoding.includes(encodings[i])) {
        return encodings[i]
      }
    }
    return false
  }

  acceptsCharset(charset: string | string[]): string | false {
    const acceptCharset = this.headers.get('accept-charset')
    if (!acceptCharset || acceptCharset === '*') {
      return typeof charset === 'string' ? charset : charset[0]
    }
    if (typeof charset === 'string') {
      charset = [charset]
    }
    for (let i = 0; i < charset.length; i++) {
      if (acceptCharset.includes(charset[i])) {
        return charset[i]
      }
    }
    return false
  }

  acceptsLanguage: (langs: string | string[]) => string | false = (langs: string | string[]) => {
    const acceptLanguage = this.headers.get('accept-language')
    if (!acceptLanguage || acceptLanguage === '*') {
      return langs[0]
    }
    if (typeof langs === 'string') {
      langs = [langs]
    }
    for (let i = 0; i < langs.length; i++) {
      if (acceptLanguage.includes(langs[i])) {
        return langs[i]
      }
    }
    return false
  }

  
  // #todo
  // redirect: (url: string, status?: number) => void = (url: string, status?: number) => {
  //   this.headers.set('location', url)
  //   if (status) {
  //     this.status = status
  //   } else {
  //     this.status = 302
  //   }
  //   this.body = `Redirecting to ${url}`
  // }

  //   set: (field: string, val: string | string[]) => void = (field: string,
  //     val: string | string[]) => {
  //       if (field === 'set-cookie') {
  //       if (typeof val === 'string') {
  //       val = [val]
  //       }
  //       const cookies = val.map((v) => Cookie.parse(v))
  //       this.headers.set(field, cookies.map((cookie) => cookie.toString()))
  //       } else {
  //       this.headers.set(field, Array.isArray(val) ? val.join(', ') : val)
  //       }
  //       }

  // Get the value of a header.
  // @param name - The name of the header.
  // @returns The value of the header, or undefined if the header is not present.

  // getHeader(name: string): string | string[] | undefined {
  //   return this.headers.get(name)
  // }
  /**

    Set the value of a header.
    @param name - The name of the header.
    @param value - The value of the header.
    @returns The value of the header.
    */
  // setHeader(name: string, value: string | string[] | null): string | string[] | undefined {
  //     if (name === 'set-cookie') {
  //       if (typeof value === 'string') {
  //         value = [value]
  //       }
  //       const cookies = value.map((v) => Cookie.parse(v))
  //       this.headers.set(name, cookies.map((cookie) => cookie.toString()))
  //     } else {
  //       if (typeof value === 'string') {
  //         this.headers.set(name, value)
  //       } else {
  //         this.headers.set(name, value.join(', '))
  //       }
  //     }
  //     return this.headers.get(name)
  //   }

  //     // Check if the request accepts the given content type.
  //     // @param types - The content types to check.
  //     // @returns true if the request accepts the content type, false otherwise.

  //     accepts(types: string | string[]): boolean {
  //     const accept = this.headers.get('accept')
  //     if (!accept || accept === '/*') {
  //     return true
  //     }
  //     if (typeof types === 'string') {
  //     types = [types]
  //     }
  //     return types.some((type) => accept.includes(type))
  // }

  //     // Get the remote address of the client making the request.
  //     // @returns The remote address of the client making the request, or undefined if it cannot be determined.

  //     getRemoteAddress(): string | undefined {
  //       return this.req ? this.req.socket.remoteAddress : undefined
  //     }
  //     /**

  //     Get the session associated with the request.
  //     @returns The session associated with the request, or undefined if no session exists.
  //     */
  //     getSession(): Session | undefined {
  //       return this.ctx?.session
  //     }
  //     /**

  //     Set the session associated with the request.
  //     @param session - The session to associate with the request.
  //     */
  //     setSession(session: Session): void {
  //       if (this.ctx) {
  //         this.ctx.session = session
  //       }
  //     }
  //     /**

  //     Get the current user making the request.
  //     @returns The current user making the request, or undefined if no user is logged in.
  //     */
  //     getUser(): User| undefined {
  //       return this.ctx?.user
  //     }
  /**

    // Set the current user making the request.
    // @param user - The user to associate with the request.
    // */
  // setUser(user: User):
}
