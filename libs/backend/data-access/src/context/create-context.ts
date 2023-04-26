  import { PrismaClient } from '@prisma/client';
  import { UserWithoutSensitiveData } from '../modules/user/user';
  import createCustomContext, { CustomContextProps, CustomContextType } from './custom-context-types';
  import { CustomRequestWithContext } from './custom-request-with-context';
  import { MyContext } from './mycontext';

  export const createContext = async (prisma: PrismaClient, req: CustomRequestWithContext<MyContext<{}>>): Promise<CustomContextType> => {
    const contextProps: CustomContextProps = await createCustomContext(prisma, req);
    const { currentUser } = contextProps;
    
    const cookies = req.get('set-cookie');
    const cookiesArray = Array.isArray(cookies) ? cookies : [cookies];
    const filteredCookies = cookiesArray.filter((cookie: string | undefined): cookie is string => cookie !== undefined && cookie !== '');

    const context: CustomContextType = {
      ...contextProps,
      req,
      userId: currentUser ? Number(currentUser.id) : undefined,
      cookies: filteredCookies,
      currentUser: currentUser as UserWithoutSensitiveData | null,
      token: '',
    }

    return context
  }
