import { PrismaClient } from '@prisma/client'
import { UserWithoutSensitiveData } from '../modules/user/user'
export interface ContextType {
  id: string | null
  prisma: PrismaClient
  userId: string | null
  currentUser: UserWithoutSensitiveData | null
  // | null #todo check if this causers errors after fixing defaultOptions
  accessToken: string | null
}
