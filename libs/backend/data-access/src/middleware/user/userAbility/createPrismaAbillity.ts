import { PrismaClient, User } from '@prisma/client'
import { Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { createForPrisma, createForUser } from './casl-abilities'

const prisma = new PrismaClient()
const req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> = {} as Request<
  ParamsDictionary,
  any,
  any,
  ParsedQs,
  Record<string, any>
>
const user = {} as User
const accessLevel = 'free'
const abilityForUser = createForUser(user)
const abilityForPrisma = await createForPrisma(prisma, req, accessLevel)

export { abilityForPrisma, abilityForUser }

