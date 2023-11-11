import { PrismaClient, User } from '@prisma/client';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../interfaces/user/custom-request';
import { AccessTier } from '../make-api/api-config/access-tier';
import { CustomSessionType } from '../make-api/my-custom-request';
import { BodyContent, CustomRequestInit } from '../make-api/requests/custom-request-init';
import { YourRequestObject } from '../make-api/requests/custom-request-with-context';
import { UserWithAccessToken, UserWithoutSensitiveData } from '../modules/user/user';
import { UserService } from '../modules/user/user.service';
import { AppConfiguration } from './app-configuration';
import { CustomURLSearchParams, MyContext } from './my-context';

export interface CustomContextType<T = MyContext<{}>> {
  ctx: any
  context?: T
  id?: string;
  customProp?: string | undefined;
  req: YourRequestObject<CustomRequestInit>
  request: CustomRequest<{}>
  body?: BodyInit | null | undefined
  userService: UserService
  requestBody?: BodyContent | null | undefined
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
  config?: AppConfiguration
  user: UserWithAccessToken
  size: 0
  url: string
  accessTier?: AccessTier | undefined
  URLSearchParams: CustomURLSearchParams
  get: (name: string) => string | undefined
  accepts: (types: string | string[] | undefined) => (string | false | null)[] | undefined
  }


export interface CustomContextProps {
  id: string;
  customProp: string;
  prisma: PrismaClient;
  userId?: string;
  currentUser?: UserWithoutSensitiveData | User |  null;
  accessToken: string | null;
  request: CustomRequest<{}>;
  [key: string]: any
}

export const createCustomContext = async (prisma: PrismaClient, req: CustomRequest<{}>): Promise<CustomContextProps> => {
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




