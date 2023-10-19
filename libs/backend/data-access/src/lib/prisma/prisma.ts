import { PrismaClient } from '@prisma/client'

export interface CustomPrismaClient extends PrismaClient {}

const prisma: CustomPrismaClient = new PrismaClient()

export default prisma
