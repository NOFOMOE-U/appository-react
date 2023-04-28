import { PrismaClient } from '@prisma/client';
import { UserWithoutSensitiveData } from '../modules/user/user';
import { createNestedContext } from './create-nested-context';
import createCustomContext, { CustomContextProps, CustomContextType } from './custom-context-types';
import { CustomRequestWithContext } from './custom-request-with-context';
import { MyContext } from './mycontext';

export const createContext = async (
  prisma: PrismaClient,
  req: CustomRequestWithContext<MyContext<{}>>

): Promise<CustomContextType<MyContext>> => {
    const contextProps: CustomContextProps = await createCustomContext(prisma, req);
    const { currentUser } = contextProps;
    
    const cookies = req?.headers?.cookie ?? undefined;
    const cookiesArray = Array.isArray(cookies) ? cookies : [cookies];
    const filteredCookies = cookiesArray.filter((cookie: string | undefined): cookie is string => typeof cookie === 'string');

  const customReq: CustomRequestWithContext<MyContext<{}>> = {
    ...req,
    token: '',
    session: undefined,
    cache: {},
    credentials: '' as any,
    ctx: createNestedContext({
      ...req.ctx,
      prisma,
      cookies: {},
      token: '',
      cache: {},
      body: {},
      session: {},
      credentials: '',
      request: req,
    }),
    getAll: (name: string) => req.headers[name.toLowerCase()] as string[],
  }

  // usage
  const context: CustomContextType<MyContext> = {
    ...contextProps,
    // ctx: {},
    req: customReq,
    request: customReq,
    context: customReq.ctx,
    body: customReq.body,
    session: customReq.session, 
    get: (name: string) => {
      const value = contextProps[name];
      if (value !== undefined) {
        return value;
      } else {
        // Look for the value in the request object
        const reqValue = customReq[name];
        if (reqValue !== undefined) {
          return reqValue;
        } else {
          // Value not found
          return undefined;
        }
      }
    },
    userId: currentUser ? Number(currentUser.id) : undefined,
    cache: {},
    credentials: '' as any,
     
    cookies: filteredCookies.reduce((acc, cookieString) => {
      const [name, value] = cookieString.split('=');
      return { ...acc, [name.trim()]: value.trim() };
    }, {}),
    currentUser: currentUser as UserWithoutSensitiveData | null,
    token: '',
    accessToken: ''
  }

  return context;
}
