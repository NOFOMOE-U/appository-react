import { Request } from 'express'
import { User } from 'libs/backend/data-access/src/node_modules/.prisma/client'

export interface CustomRequest extends Request {
    user: User
  }
  