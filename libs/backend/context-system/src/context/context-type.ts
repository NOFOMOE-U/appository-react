import { PrismaClient } from '@prisma/client'
import { UserWithoutSensitiveData } from '../modules/user/user'
export interface ContextType {
  id: string | null
  prisma: PrismaClient
  userId: string | null
  currentUser: UserWithoutSensitiveData | null
  accessToken: string | null
}
