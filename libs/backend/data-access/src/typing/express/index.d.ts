import { AuthenticatedUser } from '../../../interfaces/auth/authrequest';
declare global {
  namespace Express {
    interface Request {
      user?: typeof AuthenticatedUser
    }
  }
}