import { PrismaClient } from '@prisma/client'
import { PrismaContext } from './prisma.interface'

describe('PrismaContext', () => {
  let prisma: PrismaClient
  let context: PrismaContext

  beforeEach(() => {
    prisma = new PrismaClient()
    context = {
      prisma,
      request: {
        headers: {
          authorization: 'Bearer <valid_token>',
        },
      },
      context: {},
      body: {},
      session: {},
      cache: {},
      credentials: {},
      cookies: {},
      currentUser: null,
      token: '',
      userId: 1,
      get: () => '',
    }
  })

  afterEach(async () => {
    await prisma.$disconnect()
  })

  it('should have a prisma property', () => {
    expect(context.prisma).toBeDefined()
  })

  it('should not have response, getUserById, setAccessToken or getAuthorizationHeader properties', () => {
    expect(context.response).toBeUndefined()
    expect(context.getUserById).toBeUndefined()
    expect(context.setAccessToken).toBeUndefined()
    expect(context.getAuthorizationHeader).toBeUndefined()
  })
})
