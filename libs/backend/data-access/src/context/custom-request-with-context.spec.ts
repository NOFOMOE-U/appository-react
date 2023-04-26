import { PrismaClient, UserRole } from '@prisma/client'
import { NextFunction, Response } from 'express'
import { CustomRequest } from '../interfaces/user/custom-request'
import {
  CustomRequestWithContext,
  attachCustomContext,
  createCustomContextWithRequest,
} from './custom-request-with-context'

describe('attachCustomContext', () => {
  it('should attach custom property to request context', () => {
    const middleware = attachCustomContext()
    const req: CustomRequestWithContext = {
      ctx: {},
      user: { id: '123' },
      prisma: new PrismaClient(),
      id: '123',
      accessToken: 'abc',
      customProp: 'original custom property',
    }
    const res = {} as Response
    const next = jest.fn()

    middleware(req, res, next)

    expect(req.ctx.customProp).toEqual('example custom property')
    expect(req.customProp).toEqual('original custom property')
    expect(next).toHaveBeenCalled()
  })
})

describe('createCustomContextWithRequest', () => {
  let prisma: PrismaClient
  let middleware: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>

  beforeAll(() => {
    prisma = new PrismaClient()
    middleware = createCustomContextWithRequest(prisma, {
      id: '123',
      prisma: new PrismaClient(),
      userId: '456',
      currentUser: {
        id: '456',
        name: 'John Doe',
        email: 'ryou@gmail.com',
        roles: [UserRole.USER],
        createdAt: new Date(),
        updatedAt: new Date(),
        userProfileId: 0,
      },
      accessToken: 'abc',
    })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should create custom context and attach it to request object', async () => {
    const req: CustomRequestWithContext = {
      ctx: {},
      id: '123',
      user: { id: '123' },
      accessToken: 'abc',
      prisma: new PrismaClient(),
    }
    const res = {} as Response
    const next = jest.fn()

    await middleware(req, res, next)

    expect(req.context).toBeDefined()
    expect(req.context.id).toEqual('123')
    expect(req.context.userId).toEqual('456')
    expect(req.context.currentUser).toEqual({ id: '456', name: 'John Doe' })
    expect(req.context.accessToken).toEqual('abc')
    expect(req.context.customProp).toEqual('updated custom property')
    expect(next).toHaveBeenCalled()
  })
})
