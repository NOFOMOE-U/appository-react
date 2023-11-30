import { PrismaService } from '@appository/backend/data-access';
import { CustomPrismaClient } from 'libs/backend/data-access/src/lib/prisma/prisma';

let prisma: CustomPrismaClient;
export interface UserWithoutSensitiveData {
  password?: string
  passwordHash?: never
  resetPasswordToken?: null | string
  id: string
  email?: string
  
}



export type UserWithAccessToken = UserWithoutSensitiveData & {
  id: string
  accessToken: string
  accessLevel: string
  passwordHash: string
  resetPasswordToken: string | undefined;
  userProfileId?: number
  username: string | null
  userId: string
  customProp?: string
  prismaService?: PrismaService
  status?: string
}


















