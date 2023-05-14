import { PrismaClient } from '@prisma/client'
import { createNamespace } from 'cls-hooked'
import { Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { CustomRequestWithContext } from '../make-api/custom-request-with-context'
import { UserWithoutSensitiveData } from '../modules/user/user'
import { Context } from './context'
import { MyContext } from './my-context'

export async function getUserInfoFromDB(
  prisma: PrismaClient,
  req: CustomRequestWithContext<MyContext<{}>>,
  res: Response,
): Promise<UserWithoutSensitiveData | null> {
  const context = await Context.create(prisma, req, res)
  //convert getUserId to number

  const user = await context.getUserById(context.getUserId()!.toString())
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
