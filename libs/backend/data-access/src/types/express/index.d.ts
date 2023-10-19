import type { AuthenticatedUser } from '../../../../shared/interfaces/auth/authrequest';
import { CustomContextType } from '../../context/custom-context-type';
declare global {
  namespace Express {
    interface Request {
      user?: typeof AuthenticatedUser;
      startTime?: number;
      prisma: PrismaClient;
    }
    interface SessionData{
      userId: string
      user?: AuthenticatedUser
      token?: string
      [key: string]: any;
      session: string
    }
  }
}
declare module 'express-session' {
  interface Session {
    yourSessionKey?: string
  }
}
declare module global {
  interface Request {
    ctx: CustomContextType;
    // context: ContextType;
  }
}


export { Request, Session, SessionData };

