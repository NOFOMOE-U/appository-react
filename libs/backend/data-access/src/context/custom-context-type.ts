import { PrismaClient, User } from '@prisma/client';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../interfaces/user/custom-request';
import { CustomRequestWithContext } from '../make-api/custom-request-with-context';
import { UserWithoutSensitiveData } from '../modules/user/user';
import { AppConfiguration } from './app-configuration';
import { MyContext } from './my-context';

export interface CustomContextType<T = MyContext<{}>> {
  ctx: any;
  context: T;
  req: CustomRequestWithContext<T>;
  request: CustomRequestWithContext<T>;
  body?: any;
  session: any;
  cache: any;
  accessToken?: string;
  credentials: any;
  prisma: PrismaClient;
  cookies: Record<string, string>;
  userId?: string;
  currentUser: UserWithoutSensitiveData | null;
  token: string;
  signedCookies: string;
  get: (name: string) => string | undefined;
  config: AppConfiguration
  accepts: (types: string | string[]) => string[];
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

  let userId: string | null = null
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
    userId: userId ? userId : undefined,
    currentUser,
    accessToken: token || null,
    request: req,
    customProp: '',
  }

  return contextProps
}

export default createCustomContext;




