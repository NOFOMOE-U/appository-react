import { UserRole } from '@prisma/client';
import type { AuthenticatedUser } from '../../../../shared/interfaces/auth/authrequest';
import { CustomContextType } from '../../context/custom-context-type';
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
      startTime?: number;
      prisma: PrismaClient;
    }
    interface SessionData{
      userId: string
      user: AuthenticatedUser
      token?: string
      [key: string]: any
      session: string
      username: string
    }
  }
}
declare module 'express-session' {
  interface Session {
    yourSessionKey: string
    user?: {
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
      userProfileId: number
      roles: UserRole[]
      passwordHash: string
      email: string
      username: string
    }
    expires: number
    currentUser: UserWithoutSensitiveData | UserWithAccessToken | null
  }
}

//Extend the SessionData interface from 'express-session' if needed
// interface SessionData {
//    customSessionData: string
// }
declare module global {
  interface Request {
    ctx: CustomContextType;
    // context: ContextType;
  }
}


export { Request, Session, SessionData };

