import { PrismaClient } from '@prisma/client';
import { CustomRequestWithContext } from './custom-request-with-context';
import { MyContext } from './mycontext';

const prisma = new PrismaClient()

export const createInitialContext = (req: CustomRequestWithContext<MyContext>): MyContext => {
  const accessToken = req.get('access-token');
  const accessTokenString = Array.isArray(accessToken) ? accessToken.join('') : accessToken;
  const context: MyContext = {
    req,
    cookies: {key: ''},
    userId: '0',
    accessToken: accessTokenString || '',
    token: '',
    request: req,
    prisma: prisma,
    body: {},
    session: {},
    cache: {},
    credentials: {},
  }
  return context
}

export const initContext = async (req: CustomRequestWithContext<MyContext>): Promise<MyContext> => {
  const context = createInitialContext(req);
  return context;
}