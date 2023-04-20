import { PrismaClient, User } from '@prisma/client'
import { CustomRequest } from '../interfaces/user/custom-request'
import { UserWithoutSensitiveData } from '../modules/user/user'
  export interface MyContext<T = {}> {
    id: string
    userId: string | undefined
    currentUser?: UserWithoutSensitiveData | null
    accessToken: string | null
    token: string | null
    request: CustomRequest<T>
    prisma: PrismaClient
  }

  export interface UserWithAccessToken extends User {
    accessToken: string | null
  }

  export function setContextId(context: MyContext, id: string) {
    context.id = id
  }

  // // 3. MyContext will extend to the Custom Request
  export function getContextId(context: MyContext) {
    return context.id;
  }

