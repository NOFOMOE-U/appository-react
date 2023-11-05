  import { PrismaClient, User } from '@prisma/client';
import { convertUserToUserWithAccessToken } from '../interfaces/auth/authenticate';
import { CustomRequest, ExtendedCustomRequest } from '../interfaces/user/custom-request';
import { PrismaService } from '../lib/prisma/prisma.service';
import { CustomSessionType } from '../make-api/my-custom-request';
import { CustomRequestInit } from '../make-api/requests/custom-request-init';
import { YourRequestObject } from '../make-api/requests/custom-request-with-context';
import { UserWithoutSensitiveData } from '../modules/user/user';
import createCustomContext, { CustomContextProps, CustomContextType } from './custom-context-type';
import { MyContext, UserWithAccessToken } from './my-context';
 
let prismaService: PrismaService 

  export const createContext = async (
    prisma: PrismaClient,
    req: CustomRequest<{}>,
    // & CustomRequest
  ): Promise<CustomContextType<MyContext>> => {
    prismaService = new PrismaService()
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

    const customReq: MyContext<UserWithoutSensitiveData> = {
      ...req,
      customProp: 'custom',
      req: {} as ExtendedCustomRequest<MyContext<UserWithoutSensitiveData>>,
      token: token as string, // Added type assertion
      id: sessionData.id,
      ctx: req.session,
      request: {} as YourRequestObject<CustomRequestInit>,
      accessToken: req.accessToken as string,
      currentUser: sessionData.currentUser,
      prismaService: prismaService,
      // session: {} as CustomSessionType,
      // destination: {} as RequestDestination,
      userId: sessionData.user?.id as string,
      // request: {} as CustomRequestWithContext<CustomRequestInit>,
      user: currentUserWithAccessToken as unknown as UserWithAccessToken,
      // username: currentUserWithAccessToken?.name as string, // Added type assertion
      // yourSessionKey: sessionData.yourSessionKey as unknown as string,
      // expires: sessionData.expires,
      // credentials: '' as any,
      // // ctx: createNestedContext({
      //   ...req.context,
      //   prisma,
      //   cookies: req.context.cookies,
      //   token: req.context.token,
      //   body: req.context.body,
      //   session: req?.session as unknown as CustomSessionType,
      //   // credentials: undefined,
      //   // new(input: RequestInfo | URL, init?: RequestInit): Request
      // }),
      // getAll: (name: string) => req.headers[name.toLowerCase()] as string[],
    }

    type YourContextRequestObject = YourRequestObject<CustomRequestInit>
      & MyContext<UserWithoutSensitiveData>
    
    // usage
    const context: CustomContextType<MyContext> = {
      ...contextProps,
      req: customReq as YourContextRequestObject,
      cookie: customReq.cookie,
      request: customReq.request,
      ctx: customReq.ctx,
      // context: customReq.context,
      session: customReq.session as CustomSessionType,
      body: customReq.body,
      currentUser: customReq.currentUser,
      cache: customReq.cache,
      accepts: customReq.accepts,
      config: customReq.config,
      signedCookies: {} as Record<string, string>,
      // userId: customReq.currentUserWithAccessToken,
      token: customReq.token,
      accessToken: customReq.accessToken || null,
      // prismaService: customReq.prismaService,
      // customProp: customReq.customProp,
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
