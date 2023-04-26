import type { AuthenticatedUser } from '../../../../shared/interfaces/auth/authrequest';
import { CustomContextType } from '../../context/custom-context-types';
declare global {
  namespace Express {
    interface Request {
      user?: typeof AuthenticatedUser;
      startTime?: number;
    }
  }
}


declare module global {
  interface Request {
    ctx: CustomContextType;
    // context: ContextType;
  }
}

