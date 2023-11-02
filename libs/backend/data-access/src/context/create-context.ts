import { PrismaClient, User } from '@prisma/client';
import { convertUserToUserWithAccessToken } from '../interfaces/auth/authenticate';
import { CustomRequest } from '../interfaces/user/custom-request';
import { CustomSessionType } from '../make-api/my-custom-request';
import { CustomRequestWithContext } from '../make-api/requests/custom-request-with-context';
import { createNestedContext } from './create-nested-context';
import createCustomContext, { CustomContextProps, CustomContextType } from './custom-context-type';
import { MyContext, UserWithAccessToken } from './my-context';
 
export const createContext = async (
  prisma: PrismaClient,
  req: CustomRequest<MyContext<{}>>,
  // & CustomRequest
): Promise<CustomContextType<MyContext>> => {
  const contextProps: CustomContextProps = await createCustomContext(prisma, req)
  let currentUser  = contextProps.currentUser

  const cookies = req?.headers?.cookie ?? undefined
  const cookiesArray = Array.isArray(cookies) ? cookies : [cookies]
  const filteredCookies = cookiesArray.filter(
    (cookie: string | undefined): cookie is string => typeof cookie === 'string',
  )

  const sessionData = req.session
  const token = sessionData.yourSessionKey ?? undefined

  let currentUserWithAccessToken: UserWithAccessToken | User | undefined  

  if (currentUser) {
    // Fix error by checking type instead of using instanceof
    if (typeof currentUser === 'object' && 'passwordHash' in currentUser === false) {
      // Handle case where currentUser is UserWithoutSensitiveData
      if (!('passwordHash' in currentUser)) {
        const currentUser = currentUserWithAccessToken 
        currentUserWithAccessToken = convertUserToUserWithAccessToken(currentUser as User)
        //add a type assertion to set currentUserWithAccessToken as User
      }
    }
    // Handle case where currentUser is undefined
    // You could throw an error, return early, or provide a default value
  } else {
    // currentUser is defined, so we can safely cast
    currentUserWithAccessToken = convertUserToUserWithAccessToken(currentUser as unknown as User)
  }

  if (currentUserWithAccessToken) {
    // Use currentUserWithAccessToken here since we checked it is not null
  }

  const customReq: CustomRequestWithContext<MyContext<{}>> = {
    ...req,
    req,
    token: token as string, // Added type assertion
    id: sessionData.id,
    accessToken: req.accessToken as string,
    currentUser: sessionData.currentUser,
    session: {} as CustomSessionType,
    destination: {} as RequestDestination,
    userId: sessionData.user?.id as string,
    request: {} as CustomRequest,
    user: currentUserWithAccessToken as unknown as UserWithAccessToken,
    username: currentUserWithAccessToken?.name as string, // Added type assertion
    yourSessionKey: sessionData.yourSessionKey as unknown as string,
    expires: sessionData.expires,
    // credentials: '' as any,
    ctx: createNestedContext({
      ...req.context,
      prisma,
      cookies: req.context.cookies,
      token: req.context.token,
      body: req.context.body,
      session: req?.session as unknown as CustomSessionType,
      // credentials: undefined,
      // new(input: RequestInfo | URL, init?: RequestInit): Request
    }),
    getAll: (name: string) => req.headers[name.toLowerCase()] as string[],
  }

  // usage
  const context: CustomContextType<MyContext> = {
    ...contextProps,
    req: customReq,
    cookie: customReq.cookie,
    request: customReq,
    ctx: customReq.ctx,
    context: customReq.context,
    session: customReq.session,
    body: customReq.body,
    currentUser: customReq.currentUser,
    cache: customReq.cache,
    accepts: customReq.accepts,
    config: customReq.config,
    signedCookies: {} as Record<string, string>,
    userId: customReq.currentUserWithAccessToken,
    token: customReq.token,
    accessToken: customReq.accessToken,
    cookies: filteredCookies.reduce((acc, cookieString) => {
      const [name, value] = cookieString.split('=')
      return { ...acc, [name.trim()]: value.trim() }
    }, {}),
    get: (name: string) => {
      const value = contextProps[name]
      if (value !== undefined) {
        return value
      } else {
        // Look for the value in the request object
        const reqValue = customReq[name]
        if (reqValue !== undefined) {
          return reqValue
        } else {
          // Value not found
          return undefined
        }
      }
    },
  }

  return context
}
