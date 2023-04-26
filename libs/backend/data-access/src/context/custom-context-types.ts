import { PrismaClient, User } from '@prisma/client';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../interfaces/user/custom-request';
import { UserWithoutSensitiveData } from '../modules/user/user';

export interface CustomContextType<T = {}> {
  id: string
  user?: UserWithoutSensitiveData | null
  context: T & {}
  accessToken?: string | null
  prisma: any;
  [key: string]: any //allow any additional properties
  
  body: any
  session: any
  cookies: { [key: string]: string };
  get(name: string): string | undefined;
  ctx: T
  cache: any
  credentials: RequestCredentials
  
  // req: CustomRequestWithContext<MyContext<T>>;
  // currentUser: UserWithoutSensitiveData | null;
  // userId?: number;
  // token?: string;
  // customProp: string;
  // request: CustomRequestWithContext<MyContext<T>>// removed
}

export interface CustomContextProps {
  id: string;
  prisma: PrismaClient;
  userId?: string;
  currentUser?: UserWithoutSensitiveData | User |  null;
  accessToken: string | null;
  request: CustomRequest<{}>;
  customProp: string;
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




