import { PrismaClient, User } from '@prisma/client';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../interfaces/user/custom-request';
import { UserWithoutSensitiveData } from '../modules/user/user';
import { CustomRequestWithContext } from './custom-request-with-context';
import { MyContext } from './mycontext';

export interface CustomContextType<T = MyContext<{}>> {
  req: CustomRequestWithContext<T>;
  request: CustomRequestWithContext<T>;
  context: T;
  body: any;
  session: any;
  cache: any;
  accessToken?: string;
  credentials: any;
  prisma: PrismaClient;
  cookies: Record<string, string>;
  userId?: number;
  currentUser: UserWithoutSensitiveData | null;
  token: string;
  get: (name: string) => string | undefined;
  }

export interface CustomContextProps {
  id: string;
  prisma: PrismaClient;
  userId?: string;
  currentUser?: UserWithoutSensitiveData | User |  null;
  accessToken: string | null;
  request: CustomRequest<{}>;
  customProp: string;
  [key: string]: any
}

const createCustomContext = async (prisma: PrismaClient, req: CustomRequest<{}>): Promise<CustomContextProps> => {
  const authorizationHeader = req.headers.authorization
  const token = authorizationHeader?.replace('Bearer ', '')

  let userId: number | null = null
  let currentUser: UserWithoutSensitiveData | User | null = null

  if (token) {
    try {
      const decodedToken = Jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
      userId = decodedToken.userId
      currentUser = await prisma.user.findUnique({
        where: {
          id: userId?.toString(),
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const contextProps: CustomContextProps = {
    id: '',
    prisma,
    userId: userId ? userId.toString() : undefined,
    currentUser,
    accessToken: token || null,
    request: req,
    customProp: '',
  }

  return contextProps
}

export default createCustomContext;




