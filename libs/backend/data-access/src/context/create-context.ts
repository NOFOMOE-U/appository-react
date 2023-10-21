import { PrismaClient } from '@prisma/client';
import { Session, SessionData } from 'express-session';
import { CustomRequestWithContext } from '../make-api/custom-request-with-context';
import { UserWithoutSensitiveData } from '../modules/user/user';
import { createNestedContext } from './create-nested-context';
import createCustomContext, { CustomContextProps, CustomContextType } from './custom-context-type';
import { MyContext } from './my-context';

export const createContext = async (
  prisma: PrismaClient,
  req: CustomRequestWithContext<MyContext<{}>>

): Promise<CustomContextType<MyContext>> => {
    const contextProps: CustomContextProps = await createCustomContext(prisma, req);
    const { currentUser } = contextProps;
    
    const cookies = req?.headers?.cookie ?? undefined;
    const cookiesArray = Array.isArray(cookies) ? cookies : [cookies];
    const filteredCookies = cookiesArray.filter((cookie: string | undefined): cookie is string => typeof cookie === 'string');

  
  const sessionData = req.session;
  const token = sessionData.yourSessionKey ?? undefined;

  const customReq: CustomRequestWithContext<MyContext<{}>> = {
    ...req,
    token: token ?? '',
    session: sessionData,
    cache: {} as RequestCache,
    // credentials: '' as any,
    ctx: createNestedContext({
      ...req.ctx,
      prisma,
      cookies: {},
      token: '',
      cache: {},
      body: {},
      session: req?.session as Session & Partial<SessionData>,
      // credentials: undefined,
      request: req,
    }),
    getAll: (name: string) => req.headers[name.toLowerCase()] as string[],
  }

  // usage
  const context: CustomContextType<MyContext> = {
    ...contextProps,
    req: customReq,
    request: customReq,
    ctx: customReq.ctx,
    context: customReq.context,
    session: customReq.session, 
    body: customReq.body,
    config: customReq.config,
    signedCookies: {} as Record<string, string>,
    userId: currentUser ? currentUser.id : undefined,
    cache: {},
    currentUser: currentUser as UserWithoutSensitiveData | null,
    token: '',
    accessToken: '',
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

    accepts(types: string | string[]) {
      const typeArray = Array.isArray(types) ? types : [types];
      return typeArray;
    },
     
    cookies: filteredCookies.reduce((acc, cookieString) => {
      const [name, value] = cookieString.split('=');
      return { ...acc, [name.trim()]: value.trim() };
    }, {}),
  }

  return context;
}
