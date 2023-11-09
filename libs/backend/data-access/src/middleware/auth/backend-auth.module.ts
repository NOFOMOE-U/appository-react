import {
  BackendAuthMiddleware,
  BackendDataAccessModule,
  ContextModule,
  ContextService,
  CustomRequest,
  MyContext,
  PrismaClient,
  PrismaModule
} from '@appository/backend/data-access';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { authenticateUser } from '../user/user.middleware';
import { Readable } from 'stream';
import { getPrismaClient } from '@prisma/client/runtime';
import options from '../permissions/shield/my-options.interface';
import { CustomPrismaClient } from '../../lib/prisma/prisma';


type CustomPrismaRequest = CustomRequest<MyContext<CustomPrismaClient>>;
@Module({
  imports: [BackendDataAccessModule, ContextModule, PrismaModule],
})
  

export class BackendAuthModule implements NestModule {
  constructor(private readonly contextService: ContextService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BackendAuthMiddleware).forRoutes('*')
    consumer.apply(async (req: Request, res: Response, next: NextFunction) => {
      const prismaClient = new PrismaClient();
      // Use req.myCustomProperty and req.anotherCustomProperty here
      const customReq: CustomPrismaRequest = {
        ...req,
        prisma: prismaClient,
        id: '',
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
        token: req.body.token,
        requestBody: req.body.requestBody,
        userService: req.body.userServive,
        destination:req.body.request,
        request: req.body.request,
        username: req.body.username,
        expires: req.body.expires,
        yourSessionKey: req.body.yourSessionKey,
        cache: req.body.cache,
        context: req.body.context,
        setTimeout: function (msecs: number, callback?: (() => void) | undefined): CustomPrismaRequest {
          throw new Error('Function not implemented.');
        },
        destroy: function (error?: Error | undefined): CustomPrismaRequest {
          throw new Error('Function not implemented.');
        },
        _read: function (size: number): void {
          throw new Error('Function not implemented.');
        },
        read: function (size?: number | undefined) {
          throw new Error('Function not implemented.');
        },
        setEncoding: function (encoding: BufferEncoding): CustomPrismaRequest {
          throw new Error('Function not implemented.');
        },
        pause: function (): CustomPrismaRequest {
          throw new Error('Function not implemented.');
        },
        resume: function (): CustomPrismaRequest {
          throw new Error('Function not implemented.');
        },
        isPaused: function (): boolean {
          throw new Error('Function not implemented.');
        },
        unpipe: function (destination?: NodeJS.WritableStream | undefined): CustomPrismaRequest {
          throw new Error('Function not implemented.');
        },
        unshift: function (chunk: any, encoding?: BufferEncoding | undefined): void {
          throw new Error('Function not implemented.');
        },
        wrap: function (stream: NodeJS.ReadableStream): CustomPrismaRequest {
          throw new Error('Function not implemented.');
        },
        push: function (chunk: any, encoding?: BufferEncoding | undefined): boolean {
          throw new Error('Function not implemented.');
        },
        iterator: function (options?: { destroyOnReturn?: boolean | undefined; } | undefined): AsyncIterableIterator<any> {
          throw new Error('Function not implemented.');
        },
        map: function (fn: (data: any, options?: Pick<ArrayOptions, 'signal'> | undefined) => any, options?: ArrayOptions | undefined): Readable {
          throw new Error('Function not implemented.');
        },
        filter: function (fn: (data: any, options?: Pick<ArrayOptions, 'signal'> | undefined) => boolean | Promise<boolean>, options?: ArrayOptions | undefined): Readable {
          throw new Error('Function not implemented.');
        },
        forEach: function (fn: (data: any, options?: Pick<ArrayOptions, 'signal'> | undefined) => void | Promise<void>, options?: ArrayOptions | undefined): Promise<void> {
          throw new Error('Function not implemented.');
        },
        toArray: function (options?: Pick<ArrayOptions, 'signal'> | undefined): Promise<any[]> {
          throw new Error('Function not implemented.');
        },
        some: function (fn: (data: any, options?: Pick<ArrayOptions, 'signal'> | undefined) => boolean | Promise<boolean>, options?: ArrayOptions | undefined): Promise<boolean> {
          throw new Error('Function not implemented.');
        },
        find: function <T>(fn: (data: any, options?: Pick<ArrayOptions, 'signal'> | undefined) => data is T, options?: ArrayOptions | undefined): Promise<T | undefined> {
          throw new Error('Function not implemented.');
        },
        every: function (fn: (data: any, options?: Pick<ArrayOptions, 'signal'> | undefined) => boolean | Promise<boolean>, options?: ArrayOptions | undefined): Promise<boolean> {
          throw new Error('Function not implemented.');
        },
        flatMap: function (fn: (data: any, options?: Pick<ArrayOptions, 'signal'> | undefined) => any, options?: ArrayOptions | undefined): Readable {
          throw new Error('Function not implemented.');
        },
        drop: function (limit: number, options?: Pick<ArrayOptions, 'signal'> | undefined): Readable {
          throw new Error('Function not implemented.');
        },
        take: function (limit: number, options?: Pick<ArrayOptions, 'signal'> | undefined): Readable {
          throw new Error('Function not implemented.');
        },
        asIndexedPairs: function (options?: Pick<ArrayOptions, 'signal'> | undefined): Readable {
          throw new Error('Function not implemented.');
        },
        reduce: function <T = any>(fn: (previous: any, data: any, options?: Pick<ArrayOptions, 'signal'> | undefined) => T, initial?: undefined, options?: Pick<ArrayOptions, 'signal'> | undefined): Promise<T> {
          throw new Error('Function not implemented.');
        },
        _destroy: function (error: Error | null, callback: (error?: Error | null | undefined) => void): void {
          throw new Error('Function not implemented.');
        },
        addListener: function (event: 'close', listener: () => void): CustomPrismaRequest {
          throw new Error('Function not implemented.');
        },
        emit: function (event: 'close'): boolean {
          throw new Error('Function not implemented.');
        },
        on: function (event: 'close', listener: () => void): CustomPrismaRequest {
          throw new Error('Function not implemented.');
        },
        once: function (event: 'close', listener: () => void): CustomPrismaRequest {
          throw new Error('Function not implemented.');
        },
        prependListener: function (event: 'close', listener: () => void): CustomPrismaRequest {
          throw new Error('Function not implemented.');
        },
       
        removeListener: function (event: 'close', listener: () => void): CustomPrismaRequest {
          throw new Error('Function not implemented.');
        },
        [Symbol.asyncIterator]: function (): AsyncIterableIterator<any> {
          throw new Error('Function not implemented.');
        },
        [Symbol.asyncDispose]: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
        pipe: function <T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean | undefined; } | undefined): T {
          throw new Error('Function not implemented.');
        },
        compose: function <T extends NodeJS.ReadableStream>(stream: ((source: any) => void) | T | Iterable<T> | AsyncIterable<T>, options?: { signal: AbortSignal; } | undefined): T {
          throw new Error('Function not implemented.');
        }
      } 
      
      getPrismaClient(options)
      this.contextService.createContext(customReq, prismaClient) 

      req.prisma = prismaClient
      next()
    })

    //Add the authenticateUser middleware to the middleware stack
    consumer.apply(authenticateUser).forRoutes('*')
  }
}