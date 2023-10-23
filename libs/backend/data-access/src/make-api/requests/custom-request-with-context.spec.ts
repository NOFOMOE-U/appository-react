// import { PrismaClient, UserRole } from '@prisma/client'
// import { NextFunction, Request, Response } from 'express'
// import { Dictionary, ParamsDictionary } from 'express-serve-static-core'
// import { Session, SessionData } from 'express-session'
// import { ParsedQs } from 'qs'
// import { Readable } from 'stream'
// import { CustomContextType } from '../../context/custom-context-type'
// import { MyContext } from '../../context/my-context'
// import { CustomRequest } from '../../interfaces/user/custom-request'
// import { UserWithoutSensitiveData } from '../../modules/user/user'
// import {
//   CustomRequestWithContext,
//   attachCustomContext,
//   createCustomContextWithRequest,
// } from './custom-request-with-context'

// describe('attachCustomContext', () => {
//   it('should attach custom property to request context', () => {
//     const middleware = attachCustomContext()
//     const req: CustomRequestWithContext<MyContext> = {
//       ctx: {},
//       user: {} as UserWithoutSensitiveData,
//       prisma: new PrismaClient(),
//       id: '123',
//       accessToken: 'abc',
//       customProp: 'original custom property',
//       currentUser: {} as UserWithoutSensitiveData | null,
//       req: {
//         session: {} as Session & Partial<SessionData>,
//         cache: {} as RequestCache,
//         context: {} as CustomContextType<MyContext<{}>>,
//         get: (name: string) => undefined,
//         cookies: sessionStorage.Store,
//         signedCookies: sessionStorage.Store,
//       },
//       token: 'abc',
//       headers: {},
//       session: {} as Session & Partial<SessionData>,
//       rawHeaders: [''],
//       cookies: sessionStorage.Store,
//       context: {} as MyContext<UserWithoutSensitiveData>,
//       body: {},
//       cache: 'default',
//       userId: undefined,
//       request: {} as RequestCache,
//       signedCookies: {} as Record<string,string>,
//       get: function (name: string): string | undefined {
//         throw new Error('Function not implemented.')
//       },
//       getAll: function (name: string): string[] | undefined {
//         throw new Error('Function not implemented.')
//       },
//       [Symbol.asyncIterator]: function (): AsyncIterableIterator<any> {
//         throw new Error('Function not implemented.')
//       },
//       [Symbol.asyncDispose]: function (): Promise<void> {
//         throw new Error('Function not implemented.')
//       },
//       header: function (name: 'set-cookie'): string[] | undefined {
//         throw new Error('Function not implemented.')
//       },
//       accepts: function (): string[] {
//         throw new Error('Function not implemented.')
//       },
//       acceptsCharsets: function (): string[] {
//         throw new Error('Function not implemented.')
//       },
//       acceptsEncodings: function (): string[] {
//         throw new Error('Function not implemented.')
//       },
//       acceptsLanguages: function (): string[] {
//         throw new Error('Function not implemented.')
//       },
//       range: undefined,
//       accepted: [],
//       param: function (name: string, defaultValue?: any): string {
//         throw new Error('Function not implemented.')
//       },
//       is: function (type: string | string[]): string | false | null {
//         throw new Error('Function not implemented.')
//       },
//       protocol: '',
//       secure: false,
//       ip: '',
//       ips: [],
//       subdomains: [],
//       path: '',
//       hostname: '',
//       host: '',
//       fresh: false,
//       stale: false,
//       xhr: false,
//       method: '',
//       params: undefined,
//       query: undefined,
//       route: undefined,
//       originalUrl: '',
//       url: '',
//       baseUrl: '',
//       app: undefined,
//       aborted: false,
//       httpVersion: '',
//       httpVersionMajor: 0,
//       httpVersionMinor: 0,
//       complete: false,
//       connection: undefined,
//       socket: undefined,
//       headersDistinct: {} as Dictionary<string[]>,
//       trailers: {} as Dictionary<string>,
//       trailersDistinct: {} as Dictionary<string[]>,
//       rawTrailers: [],
//       setTimeout: function (msecs: number, callback?: (() => void) | undefined): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       destroy: function (error?: Error | undefined): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       readableAborted: false,
//       readable: false,
//       readableDidRead: false,
//       readableEncoding: null,
//       readableEnded: false,
//       readableFlowing: null,
//       readableHighWaterMark: 0,
//       readableLength: 0,
//       readableObjectMode: false,
//       destroyed: false,
//       closed: false,
//       errored: null,
//       _read: function (size: number): void {
//         throw new Error('Function not implemented.')
//       },
//       read: function (size?: number | undefined) {
//         throw new Error('Function not implemented.')
//       },
//       setEncoding: function (encoding: BufferEncoding): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       pause: function (): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       resume: function (): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       isPaused: function (): boolean {
//         throw new Error('Function not implemented.')
//       },
//       unpipe: function (destination?: NodeJS.WritableStream | undefined): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       unshift: function (chunk: any, encoding?: BufferEncoding | undefined): void {
//         throw new Error('Function not implemented.')
//       },
//       wrap: function (stream: NodeJS.ReadableStream): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       push: function (chunk: any, encoding?: BufferEncoding | undefined): boolean {
//         throw new Error('Function not implemented.')
//       },
//       iterator: function (options?: { destroyOnReturn?: boolean | undefined } | undefined): AsyncIterableIterator<any> {
//         throw new Error('Function not implemented.')
//       },
//       map: function (fn: (data: any, options?: Pick<ArrayOptions, 'signal'> | undefined) => any, options?: ArrayOptions | undefined): Readable {
//         throw new Error('Function not implemented.')
//       },
//       filter: function (fn: (data: any, options?: Pick<ArrayUniqueOptions, 'signal'> | undefined) => boolean | Promise<boolean>, options?: ArrayOptions | undefined): Readable {
//         throw new Error('Function not implemented.')
//       },
//       forEach: function (fn: (data: any, options?: Pick<ArrayOptions, 'signal'> | undefined) => void | Promise<void>, options?: ArrayOptions | undefined): Promise<void> {
//         throw new Error('Function not implemented.')
//       },
//       toArray: function (options?: Pick<ArrayOptions, 'signal'> | undefined): Promise<any[]> {
//         throw new Error('Function not implemented.')
//       },
//       some: function (fn: (data: any, options?: Pick<ArrayOptions, 'signal'> | undefined) => boolean | Promise<boolean>, options?: ArrayOptions | undefined): Promise<boolean> {
//         throw new Error('Function not implemented.')
//       },
//       find: function <T>(fn: (data: any, options?: Pick<ArrayOptions, 'signal'> | undefined) => data is T, options?: ArrayOptions | undefined): Promise<T | undefined> {
//         throw new Error('Function not implemented.')
//       },
//       every: function (fn: (data: any, options?: Pick<ArrayOptions, 'signal'> | undefined) => boolean | Promise<boolean>, options?: ArrayOptions | undefined): Promise<boolean> {
//         throw new Error('Function not implemented.')
//       },
//       flatMap: function (fn: (data: any, options?: Pick<ArrayOptions, 'signal'> | undefined) => any, options?: ArrayOptions | undefined): Readable {
//         throw new Error('Function not implemented.')
//       },
//       drop: function (limit: number, options?: Pick<ArrayOptions, 'signal'> | undefined): Readable {
//         throw new Error('Function not implemented.')
//       },
//       take: function (limit: number, options?: Pick<ArrayOptions, 'signal'> | undefined): Readable {
//         throw new Error('Function not implemented.')
//       },
//       asIndexedPairs: function (options?: Pick<ArrayOptions, 'signal'> | undefined): Readable {
//         throw new Error('Function not implemented.')
//       },
//       reduce: function <T = any>(fn: (previous: any, data: any, options?: Pick<ArrayOptions, 'signal'> | undefined) => T, initial?: undefined, options?: Pick<ArrayOptions, 'signal'> | undefined): Promise<T> {
//         throw new Error('Function not implemented.')
//       },
//       _destroy: function (error: Error | null, callback: (error?: Error | null | undefined) => void): void {
//         throw new Error('Function not implemented.')
//       },
//       addListener: function (event: 'close', listener: () => void): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       emit: function (event: 'close'): boolean {
//         throw new Error('Function not implemented.')
//       },
//       on: function (event: 'close', listener: () => void): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       once: function (event: 'close', listener: () => void): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       prependListener: function (event: 'close', listener: () => void): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       prependOnceListener: function (event: 'close', listener: () => void): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       removeListener: function (event: 'close', listener: () => void): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       pipe: function <T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean | undefined } | undefined): T {
//         throw new Error('Function not implemented.')
//       },
//       compose: function <T extends NodeJS.ReadableStream>(stream: T | ((source: any) => void) | Iterable<T> | AsyncIterable<T>, options?: { signal: AbortSignal } | undefined): T {
//         throw new Error('Function not implemented.')
//       },
//       off: function (eventName: string | symbol, listener: (...args: any[]) => void): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       removeAllListeners: function (event?: string | symbol | undefined): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       setMaxListeners: function (n: number): Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//         throw new Error('Function not implemented.')
//       },
//       getMaxListeners: function (): number {
//         throw new Error('Function not implemented.')
//       },
//       listeners: function (eventName: string | symbol): Function[] {
//         throw new Error('Function not implemented.')
//       },
//       rawListeners: function (eventName: string | symbol): Function[] {
//         throw new Error('Function not implemented.')
//       },
//       listenerCount: function (eventName: string | symbol, listener?: Function | undefined): number {
//         throw new Error('Function not implemented.')
//       },
//       eventNames: function (): (string | symbol)[] {
//         throw new Error('Function not implemented.')
//       },
//       sessionID: '',
//       sessionStore: undefined
//     }
//     const res = {} as Response
//     const next = jest.fn()

//     middleware(req, res, next)

//     expect(req.ctx.customProp).toEqual('example custom property')
//     expect(req.customProp).toEqual('original custom property')
//     expect(next).toHaveBeenCalled()
//   })
// })

// describe('createCustomContextWithRequest', () => {
//   let prisma: PrismaClient
//   let middleware: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>

//   beforeAll(() => {
//     prisma = new PrismaClient()
//     middleware = createCustomContextWithRequest(prisma, {
//       id: '123',
//       prisma: new PrismaClient(),
//       userId: '456',
//       currentUser: {
//         id: '456',
//         name: 'John Doe',
//         email: 'ryou@gmail.com',
//         roles: [UserRole.USER],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         userProfileId: 0,
//       },
//       accessToken: 'abc',
//     })
//   })

//   afterAll(async () => {
//     await prisma.$disconnect()
//   })

//   it('should create custom context and attach it to request object', async () => {
//     const req: CustomRequestWithContext<MyContext> = {
//       ctx: {},
//       id: '123',
//       user: { id: '123' },
//       accessToken: 'abc',
//       prisma: new PrismaClient(),
//     }
//     const res = {} as Response
//     const next = jest.fn()

//     await middleware(req, res, next)

//     expect(req.context).toBeDefined()
//     expect(req.context.id).toEqual('123')
//     expect(req.context.userId).toEqual('456')
//     expect(req.context.currentUser).toEqual({ id: '456', name: 'John Doe' })
//     expect(req.context.accessToken).toEqual('abc')
//     expect(req.context.customProp).toEqual('updated custom property')
//     expect(next).toHaveBeenCalled()
//   })
// })
