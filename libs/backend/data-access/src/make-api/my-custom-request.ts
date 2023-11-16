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
import { ParsedQs } from 'qs'

import { UserRole } from '@prisma/client'
import { SessionData } from 'express-session'
import * as http from 'http'
import { Session } from 'inspector'
import { Cookie } from 'tough-cookie'
import { AppConfiguration } from '../context/app-configuration'
import { MyContext } from '../context/my-context'
import errorMessages from '../middleware/permissions/error-messages'
import { UserWithAccessToken, UserWithoutSensitiveData } from '../modules/user/user'
import { UserService } from '../modules/user/user.service'
import { getDefaultAxiosOptions } from './default-options'; // Import the getDefaultAxiosOptions function
import { CustomHeadersImpl } from './headers/custom-headers-impl'
import { MyCustomHeaders } from './headers/my-custom-headers'
import { BodyContent, CustomRequestOptions } from './requests/custom-request-init'
import { CustomRequestWithContext, YourRequestObject } from './requests/custom-request-with-context'
import { CustomSocketType, SpecificSocketType, socket } from './socket/socket'

export type CustomSessionType = {
  userId: string
  username: string
  currentUser: UserWithAccessToken
  // user is going to be null if not logged in
  user: UserWithoutSensitiveData | null
  expires: number
  yourSessionKey: string
  [key: string]: any
}


export type RequestCache = {
  req?: http.IncomingMessage
  socket: CustomSocketType
}

export class MyCustomRequest<T extends MyContext<UserWithoutSensitiveData>> extends Request {
  requestBody: BodyContent | null | undefined
  customHeaders: MyCustomHeaders = new MyCustomHeaders()
  customRequestHeaders: Headers = new Headers()
  userService: UserService
  user: UserWithoutSensitiveData
  //Constructor
  constructor(
    options: CustomRequestOptions,
    userService: UserService,
    requestBody: BodyContent | null | undefined,
  ) {
    if (!options.url) {
      throw new Error('URL is required')
    }
    super(options.url, options)

    const customHeaderValues = ['value1', 'value2']
    // this.customHeaders.setCustomHeaders(customHeaderValues)
    if (options.req) {
      this.req = {...this.req, socket: options.req.socket as unknown} as typeof this.req
    }
    ;(this.body = options.body),
      (this.userService = options.userService),
      (this.requestBody = options.requestBody),
      (this.user = options.user),
      (this.params = options.params),
      (this.request = options.request),
      // Set the 'url' and 'method' properties
      (this.url = options.url)
    
    this.method = options.method || 'GET' // You can provide a default method if needed
    this.context = options.body || ({} as T)
    this.customRequestHeaders = new CustomHeadersImpl({})
    this.customRequestHeaders = new Headers()
    // set custom headers as needed
    this.customHeaders.setAuthorization('your-token') // change to auth token
    this.customHeaders.setAcceptJson()
    // Set custom headers as needed directly on the headers property
    this.customRequestHeaders.set('Content-Type', 'application/json')
    this.customRequestHeaders.set('Authorization', 'Bearer token')

    for (const value of customHeaderValues) {
      this.customRequestHeaders.set('Custom-Header', value)
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
      context: {} as MyContext<UserWithoutSensitiveData>,
      method: 'GET',
      ...partialRequest,
      user: this.context.user,
      username: this.context.username,
      expires: this.context.expires,
      yourSessionKey: this.context.yourSessionKey,
      headers: this.context.headers,
      customProp: this.context.customProp,
      currentUser: this.context.currentUser,
      config: this.context.config,
      status: this.context.status,
      id: this.context.id,
      ctx: this.context.ctx,
      accessToken: this.context.accessToken,
      prisma: this.context.prisma,
      req: this.context.req,
      session: this.context.session,
      token: this.context.token,
      cookies: this.context.cookiesArray,
      userId: this.context.userId,
      request: this.context.request,
      signedCookies: this.context.signedCookies,
      accepts: this.context.accept,
      accepted: [],
      rawHeaders: [],

      getCustomHeader(): string | null {
        return this.customHeaders.getCustomHeader()
      },

      get(name: string): string | undefined {
        return this.customHeaders.get(name) ?? undefined
      },

      getAll: function (name: string): string[] | undefined {
        throw new Error('Function not implemented.')
      },

      [Symbol.asyncIterator]: function (): AsyncIterableIterator<any> {
        throw new Error('Function not implemented.')
      },

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

      addListener: function (event: 'close'): boolean {
        throw new Error('Function not implemented.')
      },

      emit: function (event: 'close'): boolean {
        throw new Error('Function not implemented.')
      },
      on: function (
        event: 'close',
        listener: () => void,
      ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      once: function (
        event: 'close',
        listener: () => void,
      ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      prependListener: function (
        event: 'close',
        listener: () => void,
      ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      prependOnceListener: function (
        event: 'close',
        listener: () => void,
      ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        throw new Error('Function not implemented.')
      },
      removeListener: function (
        event: 'close',
        listener: () => void,
      ): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
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
      sessionID: sessionStorage.Store.sessionID,
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
      const customRequest: MyCustomRequest<MyContext> = new MyCustomRequest<MyContext<UserWithoutSensitiveData>>(
      options,
      userService,
      requestBody,
     )
    customRequest.customHeaders = customHeaders

    // Assign it to the main headers
    this.customRequestHeaders = customHeaders
  }

  //error handling
  handleError(errorCode: string, message: string, status: number) {
    const errorMessage = errorMessages[errorCode] || message

    if (this.customRequestHeaders instanceof Headers) {
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
  // add properties
  config: AppConfiguration = {
    defaultUserRole: UserRole.USER,
    userRoles: [],
    moderatorRoles: [],
    allowedLocations: [],
    maxFileSize: 1000, // todo figure out file size here
    enableVideo: false,
    enableAudio: false,
    allowRegistration: false,
    requireEmailVerification: false,
    allowPublicRooms: false,
    allowPrivateRooms: false,
    enableModeration: false,
    allowFileUploads: false,
    enableNotifications: false,
    restrictAccessByLocation: false,
  }

  currentUser?: UserWithoutSensitiveData | undefined | null
  // sessions: SessionData
  query: ParsedQs = {}
  params?: { [key: string]: string }
  body: any
  request: YourRequestObject<MyContext>
  customCache?: RequestCache
  customHeadersProperty!: Headers
  req?: RequestCache
  session?: CustomSessionType
  context?: any = {}
  cookies: Record<string, string> = {}
  signedCookies: Record<string, string> = {}
  //todo update to correct url
  url: string = 'https://example.com/api' // Replace with your default URL
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | string = 'GET'
  ctx: any = {} // adjust the type as needed
  accessToken: string | null = null
  rawHeaders: string[] = []
  push: (chunk: any, encoding?: BufferEncoding | undefined) => boolean = (
    chunk: any,
    encoding?: BufferEncoding | undefined,
  ) => false
  unshift: (chunk: any) => void = (chunk: any) => {};
  [Symbol.asyncIterator]: () => AsyncIterableIterator<any> = async function* () {}

  async fetch(): Promise<Response> {
    const yourSignedCookie = this.signedCookies['userToken']
    const fetchOptions: RequestInit = {
      method: this.method,
      headers: this.customRequestHeaders as unknown as HeadersInit,
      body: this.body ? JSON.stringify(this.body) : null,
    }
    return fetch(this.url, fetchOptions)
  }
  [Symbol.asyncDispose]!: () => Promise<void>
  header!: any // Update the type as needed
  acceptsCharsets!: any // Update the type as needed
  get(name: string): undefined
  get(name: string): string | string[] | undefined {
    const value = this.headers.get(name)
    if (value === undefined) {
      return undefined
    } else if (typeof value === 'string') {
      return value
    } else {
      return [value as unknown as string]
    }
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

  accepts(): string[]
  accepts(type: string): string | false
  accepts(types: string[]): string | false
  accepts(types?: string | string[] | undefined): string | string[] | false {
    if (types === undefined) {
      // Logic to return accepted types as an array when called with no arguments
      const acceptHeader = this.headers.get('Accept')
      if (acceptHeader) {
        return acceptHeader.split(',')
      } else {
        return []
      }
    } else if (typeof types === 'string') {
      // Logic to return a single type or false when called with a string argument
      // You can implement the logic to check the preferred type here
      const preferredType = this.getPreferredType(types)
      if (preferredType) {
        return preferredType
      }
      return false
    } else {
      // Logic to return a single type or false when called with an array of types
      // You can implement the logic to check the preferred type here
      const preferredType = this.getPreferredType(types)
      if (preferredType) {
        return preferredType
      }
      return false
    }
  }

  private getPreferredType(types: string | string[] | undefined): string | false {
    const acceptHeader = this.headers.get('Accept')

    if (acceptHeader && types) {
      if (typeof types === 'string') {
        // If 'types' is a single string, convert it to an array
        types = [types]
      }

      // Split the 'Accept' header into an array of accepted types
      const acceptedTypes = acceptHeader.split(',')

      for (const type of types) {
        // Loop through the provided types
        if (acceptedTypes.includes(type)) {
          // If the 'Accept' header contains the type, return it
          return type
        }
      }
    }
    // If no preferred type is found or types are not provided, return false
    return false
  }
  setAcceptHeader(types: string[] | string, preferredType?: string): string | false {
    let acceptHeader: string | null | undefined = this.get('Accept') !== undefined ? this.get('Accept') : null
    if (typeof types === 'string') {
      types = [types]
    }

    if (acceptHeader !== undefined) {
      if (preferredType) {
        return this.acceptSingle(preferredType, acceptHeader)
      }

      return this.acceptMultiple(types, acceptHeader)
    }
    return "Accept headers aren't defined"
  }

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

  setAcceptJson(): void {
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

  // Add a function to set the authenticated user
  setAuthenticatedUser(user: UserWithoutSensitiveData) {
    this.currentUser = user
  }

  // Add a function to clear the authenticated user (log out)
  clearAuthenticatedUser() {
    this.currentUser = null
  }

  setUserInSession(user: UserWithAccessToken) {
    if (this.session) {
      this.session.currentUser = user
    }
  }

  getCurrentUserFromSession(): UserWithAccessToken | undefined {
    return this.session ? this.session.currentUser : undefined
  }

  clearUserFromSession() {
    if (this.session) {
      this.session.currentUser = undefined as unknown as UserWithAccessToken
    }
  }

  setSessionVariable(key: string, value: any) {
    if (!this.session) {
      this.session = {} as CustomSessionType // Initialize the session object if it doesn't exist
    }
    ;(this.session as CustomSessionType)[key] = value
  }

  // Example: Get a session variable
  getSessionVariable(key: string): any | undefined {
    return this.session ? (this.session as CustomSessionType)[key] : undefined
  }

  // Example: Clear a session variable
  clearSessionVariable(key: string) {
    if (this.session) {
      delete (this.session as CustomSessionType)[key]
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

  // Get the value of a header.
  // @param name - The name of the header.
  // @returns The value of the header, or undefined if the header is not present.

  getHeader(name: string): string | string[] | undefined {
    return this.headers.get(name) as string | string[] | undefined
  }
  /**

      Set the value of a header.
      @param name - The name of the header.
      @param value - The value of the header.
      @returns The value of the header.
      */
  setHeader(name: string, value: string | string[] | null): string | string[] | undefined {
    if (name === 'set-cookie') {
      if (typeof value === 'string') {
        value = [value]
      }
      const cookies = value?.map((v) => Cookie.parse(v))
      if (cookies !== undefined) {
        this.headers.set(name, cookies?.map((cookie) => cookie?.toString()).join(', '))
      }
    } else {
      if (typeof value === 'string') {
        this.headers.set(name, value)
      } else {
        if (Array.isArray(value)) {
          this.headers.set(name, value.join(', '))
        } else {
          this.headers.delete(name)
        }
      }
    }
    return this.headers.get(name) as string | string[] | undefined
  }

  //     // Check if the request accepts the given content type.
  //     // @param types - The content types to check.
  //     // @returns true if the request accepts the content type, false otherwise.

  //     // Get the remote address of the client making the request.
  //     // @returns The remote address of the client making the request, or undefined if it cannot be determined.

  getRemoteAddress(): string | undefined {
    if (this.req?.socket) {
      const { remoteAddress } = this.req.socket as unknown as SpecificSocketType
      return remoteAddress
    }
    return undefined
  }

  //     /**

  //     Get the session associated with the request.
  //     @returns The session associated with the request, or undefined if no session exists.
  //     */
  getSession(): SessionData | undefined {
    return this.ctx?.session
  }
  //     /**

  //     Set the session associated with the request.
  //     @param session - The session to associate with the request.
  //     */
  setSession(session: Session): void {
    if (this.ctx) {
      this.ctx.session = session
    }
  }
  /**
      Get the current user making the request.
      @returns The current user making the request, or undefined if no user is logged in.
      */
  getUser(): UserWithAccessToken | undefined {
    return this.ctx?.user
  }
  /**
      // Set the current user making the request.
      // @param user - The user to associate with the request.
      // 
    */
  setUser(user: UserWithAccessToken) {
    return this.userService.setUser(user)
  }
}
