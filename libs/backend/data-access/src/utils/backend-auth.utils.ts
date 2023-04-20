import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Add types for the payload and options arguments
interface TokenPayload {
  userId: number;
}

interface VerifyOptions {
  secret: string;
}

export const getUserId = async (req?: Request): Promise<number | null> => {
  const authorizationHeader = req?.headers?.authorization;

  if (!authorizationHeader) {
    return null;
  }

  const token = authorizationHeader.replace('Bearer ', '');
  const { userId } = jwt.verify(token, process.env. _SECRET as string, {
    algorithms: ['HS256'],
  } as VerifyOptions & jwt.VerifyOptions & { algorithms: ['HS256'] }) as TokenPayload;

  return userId;
};

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<any, Record<string, any>> | void> => {
  const userId = await getUserId(req);

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  // Add the user ID to the request object so it can be used in later middleware
  (req as any).userId = userId;

  next();
};

