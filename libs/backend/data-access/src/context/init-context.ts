import { PrismaClient } from '@prisma/client'
import { Session, SessionData } from 'express-session'
import { Headers } from 'node-fetch'
import { CustomSessionType } from '../make-api/my-custom-request'
import { CustomRequestWithContext } from '../make-api/requests/custom-request-with-context'
import { AppConfiguration } from './app-configuration'
import { CustomContextType } from './custom-context-type'
import { MyContext } from './my-context'

const prisma = new PrismaClient()

interface ExtendedRequest extends Request {
  session: SessionData; 
}

export const createInitialContext = (req: CustomRequestWithContext<MyContext>): MyContext => {
  const accessToken = req.get('access-token') || ''

  // create an instance of Headers, 
  const headers = new Headers()
  //loop through key value pairs from the entries
  //use the parse method of the http module to 
  // parse the headers key value from a string
  for (const [key, value] of Object.entries(req.headers)) {
    //then parse the key and value to set as a string on headers.
    headers.set(key, value as string)
  }

  const context: MyContext = {
    config: {} as AppConfiguration,
    session: req.session as Session & Partial<SessionData> & CustomSessionType,
    cookies: {} as Record<string, string>, // Add your cookies data here if needed
    currentUser: req.session.currentUser || null,
    userId: req.session.userId || '', // Initialize with the user ID if available
    accessToken, // Set the access token
    token: '', // Initialize with the token if available
    request: {} as Request, // Set the request object
    req:{} as CustomRequestWithContext<MyContext<CustomSessionType>>['req'] & ExtendedCustomRequest<MyContext<CustomSessionType>>    prisma: prisma, // Set the Prisma client instance
    body: {}, // Add your request body data here if needed
    cache: {} as RequestCache, // Add caching data here if needed
    // credentials: {}, // Add credentials data here if needed
    context: {} as MyContext<{}>, // Add your custom context data here if needed
    ctx: {} as MyContext<{}>, // Add your custom context data here if needed, 
    get: (name: string) => undefined, // Define the get function if needed
    signedCookies: {} as Record<string, string>, // Add signed cookies data here if needed
    accepts: (types: string | string[]) => [],
  } 
  return context
}
//define an asynchronous function that initializes the context
export const initContext = async (req: CustomRequestWithContext<MyContext>): Promise<MyContext> => {
  const context = createInitialContext(req) as unknown as MyContext<CustomContextType>
  return context
}


// #review usecase
// this file is to provide a centralized way to manage the context object for a NestJS application. 
// The context object contains various properties related to the current request and user, 
// and it can be used by other parts of the application to access this information.

// This file should be used whenever a NestJS application needs to manage context information for 
// requests and users.For example, if an application needs to retrieve user information for a specific 
// request or needs to store information that needs to persist across multiple requests, this file can be used to create and manage 
// the context object.