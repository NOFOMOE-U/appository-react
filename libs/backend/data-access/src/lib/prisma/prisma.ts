import { PrismaClient } from '@prisma/client'

interface CustomPrismaClient extends PrismaClient {}

const prisma: CustomPrismaClient = new PrismaClient()

export default prisma
