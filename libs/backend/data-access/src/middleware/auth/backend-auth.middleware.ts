  import { PrismaClient } from '@prisma/client'
import { NextFunction, Response } from 'express'
import { YourRequestObject } from '../../make-api/requests/custom-request-with-context'
import { UserWithAccessToken } from '../../modules/user/user'

  const jwt = require('jsonwebtoken')

  const prisma = new PrismaClient()
  const secret = 'mysecret'

  export async function BackendAuthMiddleware(req: YourRequestObject<UserWithAccessToken>, res: Response, next: NextFunction): Promise<void> {
    const authHeader =  req.headers.authorization

    if (!authHeader) {
      res.status(401).json({ error: 'No token provided' })
      return
    }

    const authHeaderString = authHeader as string;
    const parts = authHeaderString.split(' ');

    if (parts.length !== 2) {
      res.status(401).json({ error: 'Token error' })
      return
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      res.status(401).json({ error: 'Token malformatted' })
      return
    }

    try {
      const decoded = jwt.verify(token, secret) as { id: string }
      const user = await prisma.user.findUnique({ where: { id: decoded.id } })

      if (!user) {
        res.status(401).json({ error: 'User not found' })
        return
      }

      req.user = {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        username: user.username,
        // posts: user.posts,
        roles: user.roles,
        userProfileId: user.userProfileId as number,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        resetPasswordToken: undefined,
      }

      next()
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' })
      return
    }
  }
