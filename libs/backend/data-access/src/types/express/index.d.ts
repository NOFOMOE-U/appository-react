import type { AuthenticatedUser } from '../../../../shared/interfaces/auth/authrequest';
import { CustomContextType } from '../../context/custom-context-type';
declare global {
  namespace Express {
    interface Request {
      user?: typeof AuthenticatedUser;
      startTime?: number;
      prisma: PrismaClient
    }
    interface SessionData{
      userId?: string
      [key: string]: any;
    }
  }
}

declare module global {
  interface Request {
    ctx: CustomContextType;
    // context: ContextType;
  }
}

export { Request, SessionData };

