import { PrismaClient } from '@prisma/client'
import { SessionData } from 'express-session'
import { Headers } from 'node-fetch'
import { CustomRequestWithContext } from '../make-api/custom-request-with-context'
import { MyContext } from './my-context'

const prisma = new PrismaClient()

interface ExtendedRequest extends Request {
  session: SessionData; // replace 'any' with the type of your session data
}

export const createInitialContext = (req: CustomRequestWithContext<MyContext>): MyContext => {
  const accessToken = req.get('access-token')
  const accessTokenString = Array.isArray(accessToken) ? accessToken.join('') : accessToken

  // create an instance of Headers, 
  const headers = new Headers()  //loop through key value pairs from the entries 
  //use the parse method of the http module to 
  // parse the headers key value from a string
  for (const [key, value] of Object.entries(req.headers)) {
    //then parse the key and value to set as a string on headers.
    headers.set(key, value as string)
  }

  const context: MyContext = {
    cookies: {}, // Add your cookies data here if needed
    userId: '', // Initialize with the user ID if available
    accessToken: accessTokenString || '', // Set the access token
    token: '', // Initialize with the token if available
    request: {} as Request, // Set the request object
    prisma: prisma, // Set the Prisma client instance
    body: {}, // Add your request body data here if needed
    cache: {} as RequestCache, // Add caching data here if needed
    credentials: {}, // Add credentials data here if needed
    context: {} as MyContext<{}>, // Add your custom context data here if needed
    get: (name: string) => undefined, // Define the get function if needed
    signedCookies: {}, // Add signed cookies data here if needed
    accepts: (types: string | string[]) => [],
  } 
  return context
}
//define an asynchronous function that initializes the context
export const initContext = async (req: CustomRequestWithContext<MyContext>): Promise<MyContext> => {
  const context = createInitialContext(req)
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