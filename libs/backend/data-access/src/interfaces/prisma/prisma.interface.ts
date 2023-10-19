import { Context } from "../../context/context";
import { CustomPrismaClient } from "../../lib/prisma/prisma";
import { UserWithoutSensitiveData } from "../../modules/user/user";

export interface PrismaContext extends Omit<Context, 'response' | 'getUserById' | 'setAccessToken' | 'getAuthorizationHeader'>{
    prisma: CustomPrismaClient;
    cookies: Record<string, string>;
    id: string;
    currentUser: UserWithoutSensitiveData;
    token: string;
}