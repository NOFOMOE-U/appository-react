import { PrismaClient } from '@prisma/client';
import { NextFunction, Response } from 'express';
import { CustomRequest } from '../../../../request-options/src/custom-request/custom-request';
import { createContext } from '../../context/create-context';
import { CustomContextType } from '../../context/custom-context-type';
import { MyContext } from '../../context/my-context';
import { convertUserToUserWithAccessToken } from '../../interfaces/auth/authenticate';
import { UserWithAccessToken } from '../../modules/user/user';
// Instantiate a new Prisma client
const prisma = new PrismaClient();

export type AuthenticatedSession = AuthenticatedRequest & CustomRequest<MyContext<{}>>
type RequestContext = CustomContextType<MyContext<{}>> & MyContext<{}>
export interface AuthenticatedRequest  {
  context: CustomContextType;
  user: UserWithAccessToken
}  

/**
 * Middleware that checks if the user making the request has the required role.
 * @param roles The list of required roles for this endpoint.
 */
export async function authorizeUser(...roles: string[]) {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    // If the user is not authenticated, return an error
    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'You must be logged in to access this resource.',
      });
    }

    // If the user's role is not allowed, return an error
    if (!user || !roles.includes(user.roles.toString())) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You do not have permission to access this resource.',
      });
    }

    // If the user's role is allowed, proceed to the next middleware
    return next();
  };
}


/**
 * Middleware that sets the authenticated user on the request object.
 */
export async function authenticateUser(req: AuthenticatedSession, res: Response, next: NextFunction) {
  try {
  const context: CustomContextType<MyContext<{}>> = await createContext(prisma, req);

    // Set the context on the request object
    (req as AuthenticatedRequest).context = context as RequestContext

  // If there is no user ID in the context, skip this middleware
  if (!context.userId) {
    return next();
  }

    // Fetch the user from the database and set it on the request object
    const user = await prisma.user.findUnique({
      where: { id: context.userId },
    });

    // ensure that if it is not user or null, to throw an error 
    if (!user) {
      return res.status(500).json({
        error: 'internal server error',
        message: 'error occurred while fetching user'
      })
    }

    const userWithAccessToken = convertUserToUserWithAccessToken(user)
    
    //return user
    req.user = userWithAccessToken
    return next();
  } catch (err) {
    console.error(err);
    // If the user cannot be found in the database, return an error
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while fetching the user.',
    });
  }
}
