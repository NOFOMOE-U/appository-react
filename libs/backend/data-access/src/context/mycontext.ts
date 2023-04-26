import { PrismaClient, User } from '@prisma/client'
import { UserWithoutSensitiveData } from '../modules/user/user'
import { CustomRequestWithContext } from './custom-request-with-context'
 
export interface MyContext<T = {}> {
    req: CustomRequestWithContext<MyContext>
    id: string //removing the id will  cause errors because  it is being used in the setContextId and getContextId
    currentUser?: UserWithoutSensitiveData | null //removing currentUser will create error in context-service.ts
    userId?: number 
    cookies: {key: [string] | string},
  

    request: CustomRequestWithContext<MyContext<T>>
    prisma: PrismaClient
    // get: () => string; // removing get will cause an error iin my-options.interface
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

