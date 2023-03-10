import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
}

export async function createContext(): Promise<Context> {
  const prisma = new PrismaClient()
  return {
      prisma,
  }
}
