import { PrismaClient, User } from '@prisma/client';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../interfaces/user/custom-request';
import { CustomSessionType } from '../make-api/my-custom-request';
import { CustomRequestInit } from '../make-api/requests/custom-request-init';
import { CustomRequestWithContext, YourRequestObject } from '../make-api/requests/custom-request-with-context';
import { UserWithoutSensitiveData } from '../modules/user/user';
import { AppConfiguration } from './app-configuration';
import { MyContext } from './my-context';

export interface CustomContextType<T = MyContext<{}>> {
  ctx: any;
  context?: T;
  req: YourRequestObject<CustomRequestInit>;
  request: YourRequestObject<CustomRequestInit>;
  body?: CustomRequestWithContext<T>['body'];
  session: CustomSessionType
  cache?: RequestCache
  cookie?: string | undefined
  accessToken: string | null;
  prisma: PrismaClient;
  cookies: Record<string, string>;
  userId?: string;
  currentUser: UserWithoutSensitiveData | undefined | null;
  token?: string;
  signedCookies: Record<string,string>;
  get: (name: string) => string | undefined;
  config?: AppConfiguration
  accepts: (types: string | string[]) => string | string[] | null | false;
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




