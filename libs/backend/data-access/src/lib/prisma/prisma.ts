import { PrismaClient } from '@prisma/client';

export interface CustomPrismaClient extends PrismaClient {
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    schema?: string
}

const prisma: CustomPrismaClient = new PrismaClient()

export default prisma
