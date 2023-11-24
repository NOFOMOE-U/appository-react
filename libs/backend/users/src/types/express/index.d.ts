import { UserRole } from '@prisma/client';
import { CustomContextType } from '../../context/custom-context-type';
import type { AuthenticatedUser } from '../../user/types';
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
      passwordHash: undefined
      email: string
      username: string
      resetPasswordToken?: string
    }
    expires: number
    currentUser: UserWithoutSensitiveData | UserWithAccessToken | null
  }
}

//Extend the SessionData interface from 'express-session' if needed
// interface SessionData {
//    customSessionData: string
// }
declare namespace global {
  interface Request {
    ctx: CustomContextType;
    // context: ContextType;
  }
}


export { Request, Session, SessionData };

