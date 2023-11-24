import { CustomPrismaClient } from '../../lib/prisma/prisma';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { User } from '@appository/backend/data-access';


let prisma: CustomPrismaClient;
export interface UserWithoutSensitiveData extends Omit<User, 'passwordHash' | 'resetPasswordToken'> {
  password?: string
  passwordHash?: never
  resetPasswordToken?: null | string
  id: string
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


















