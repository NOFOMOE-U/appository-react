import { PrismaClient } from "@prisma/client";
import { Context } from "../../context/context";

export interface PrismaContext extends Omit<Context, 'response' | 'getUserById' | 'setAccessToken' | 'getAuthorizationHeader'>{
    prisma: PrismaClient
}