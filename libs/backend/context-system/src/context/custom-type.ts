import { PrismaClient } from "@prisma/client";

export interface CustomType {
    id: string | null,
    prisma: PrismaClient,
    userId: string | null,
    currentUser: string | null,
    accessToken: string | null
}