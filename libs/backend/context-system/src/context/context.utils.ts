import { PrismaClient, User } from '@prisma/client'
import { createNamespace } from 'cls-hooked'
import { Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { CustomRequestWithContext } from '../make-api/requests/custom-request-with-context'
import { MyContext } from './my-context'

export async function getUserInfoFromDB(
  prisma: PrismaClient,
  req: CustomRequestWithContext<MyContext<{}>>,
  res: Response,
): Promise<User | null> {
  
  //get the user ID from the session
  const userIdString = req.session.userId

  //convert to a number
  const userId = parseInt(userIdString, 10)

  if(isNaN(userId)){
    return null
  }
  //convert getUserId to number
  const user = await prisma.user.findUnique({
    where: { id: userId.toString()}
  })

  return user
}

export const contextNamespace = createNamespace('request-context')

export function setRequestContext(requestId: string) {
  contextNamespace.run(() => {
    contextNamespace.set('requestId', requestId)
  })
}

export function getRequestContext() {
  const id = contextNamespace.get('requestId') || uuidv4()
  setRequestContext(id)
  return { id }
}
