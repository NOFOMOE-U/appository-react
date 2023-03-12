import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedUser } from '../../interfaces/auth/authrequest';

const prisma = new PrismaClient();
const secret = 'mysecret';

export async function BackendAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token malformatted' });
  }

  try {
    const decoded = jwt.verify(token, secret) as { id: string };
    const user = (await prisma.user.findUnique({ where: { id: decoded.id } })) as typeof AuthenticatedUser;

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
