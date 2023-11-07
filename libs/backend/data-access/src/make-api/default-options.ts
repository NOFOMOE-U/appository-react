import { PrismaService, User, UserRole, UserService, UserWithAccessToken, UserWithoutSensitiveData } from '@appository/backend/data-access'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { Socket } from 'socket.io'
import { AppConfiguration } from '../context/app-configuration'
import { CustomContextType } from '../context/custom-context-type'
import { CustomURLSearchParams, MyContext } from '../context/my-context'
import prisma, { CustomPrismaClient } from '../lib/prisma/prisma'
import { authenticationMiddlware, socket } from '../server'
import { SessionData } from '../types/express'
import generateToken from '../utils/generate-token.utils'
import { CustomSessionType, MyCustomRequest } from './my-custom-request'
import { BodyContent, CustomRequestInit } from './requests/custom-request-init'
import {
  CustomContextHeaders,
  CustomRequestWithContext,
  YourRequestObject,
} from './requests/custom-request-with-context'
import { specificSocket } from './socket/socket'
 
type CustomRequestType = CustomRequestWithContext<
  MyContext<{} | Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>>
>
// Define the RequestOptions type
type RequestOptions = {
  headers: {
    [key: string]: string | string[] | undefined
  }
  baseURL: string
  responseType: string
  id: string
  ctx: {
    headers: {
      [key: string]: string | string[] | undefined
    }
    accessToken?: string
  }
  prisma: CustomPrismaClient
  req: Request
  // Add other properties you need
}

interface CommonUserProperties {
  id: string
  user: string
  username: string
  passwordHash: string | null
  accessToken: string
  email: string
  name: string
  roles: UserRole[]
  createdAt: Date
  updatedAt: Date
  userProfileId: number
  resetPasswordToken: string
}
type CommonUserType = Omit<CommonUserProperties, 'passwordHash'>
{
  
  };

type CustomRequestTypeOptions = CustomRequestType & Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>

let myRequest: MyCustomRequest<MyContext> | null = null
let currentUser: CommonUserProperties | null | undefined

if (currentUser) {
  const userWithPasswordHash = currentUser as CommonUserProperties

  if (!userWithPasswordHash.passwordHash) {
    throw new Error('User is missing passwordHash')
  }

  // Verify that 'default-value' is not the actual password hash
  if (userWithPasswordHash.passwordHash === 'default-value') {
    throw new Error('Default password hash detected')
  }

  if (userWithPasswordHash !== undefined) {
    const userWithPasswordHash: User = currentUser
    const token = generateToken(userWithPasswordHash)
  }
}

if (currentUser) {
  const userWithPasswordHash: User = currentUser
  const token = generateToken(userWithPasswordHash)
}

function initializeCommonHeaders(socket: Socket): CustomContextHeaders {
  return {
    // Define a common headers object with default headers
    'Strict-Transport-Security': '',
    'X-Content-Type-Options': '',
    'X-Frame-Options': '',
    'X-XSS-Protection': '',
    'x-powered-by': '',
    'x-test-header': '',
    'Access-Control-Allow-Origin': '',
    Authorization: '',
    'Content-Type': '',
    Referer: '',
    'Referer-Policy': '',
  } as CustomContextHeaders
}

export let myContext:
  | CustomContextType<
      MyContext<{}> & {
        ctx: CustomContextType<MyContext<{}>>
      }
    >
  | undefined

let commonHeaders: CustomContextHeaders = {}

 export function processRequest(req: YourRequestObject<{}>, res: Response, next: NextFunction) {
  const socketId = 'yourSocketId'
   let specificSocket
   
  const prismaService = new PrismaService()
  let userService: UserService = new UserService(prismaService)
  let requestBody: BodyContent | null = null

  if (req) {
    // Initialize common headers
    specificSocket = socket.sockets.sockets.get(socketId)
  }

  if (specificSocket) {
    const commonHeaders: CustomContextHeaders = initializeCommonHeaders(specificSocket)

    authenticationMiddlware(req, res, () => {
      if (myContext) {

        if (myContext.context.user !== undefined) {
        }
          
          const myRequest = new MyCustomRequest<MyContext>(myContext, userService, requestBody)
        // Access and use the available methods and properties:
        const authorizationHeader = myRequest?.headers?.get('Authorization') // Access a specific header
        myRequest?.accepts('application/json') // Check accepted content types
        // const isUnauthenticated = myRequest.isUnauthenticated() // Check if the request is unauthenticated
        myRequest?.customHeadersMethod('Custom-Header', 'new-value') // Set a custom header
        const acceptedEncoding = myRequest?.acceptsEncoding('gzip') // Check accepted encodings
        const acceptedCharset = myRequest?.acceptsCharset('utf-8') // Check accepted charsets
        const acceptedLanguage = myRequest?.acceptsLanguage('en-US') // Check accepted languages

        // Access request properties
        const url = myRequest?.url
        const method = myRequest?.method
        const headers = myRequest?.headers
        const body = myRequest?.body
        const sessionData = myRequest?.session // Session data
        const queryParameters = myRequest?.query
        const requestParams = myRequest?.params
        const cache = myRequest?.customCache
        const accessToken = myRequest?.accessToken
        // You can perform various operations using these methods and properties.
        // Add your logic based on your specific use case.
        next()
      } else {
        // Handle the case when myContext is null
        // You can add specific handling here, like setting a default value or throwing an error
        // Set default values or take any other appropriate actions
        if (myRequest) {
          myRequest.customHeadersMethod('Custom-Header', 'default-value')
          myRequest.setAcceptJson() // Set a default Accept header
          myRequest.handleError('DEFAULT_ERROR', 'Default error message', 500) // Handle a default error
          next()
        }

        console.error('myContext is null. Handle this case appropriately.')
        next(new Error('myContext is null'))
      }
    })

    const myContext = {
      // Initialize common properties

      // Other properties in your context...
      user: {} as UserWithAccessToken, // Changed type to UserWithAccessToken
      accessToken: SessionData.setAccessToken,
      config: {} as AppConfiguration,
      context: {} as CustomContextType<MyContext<{}>>,
      ctx: {} as MyContext<{}>,
      body: {} as BodyInit | null | undefined,
      userService: {} as UserService,
      requestBody: {} as BodyContent | null | undefined,
      URLSearchParams: {} as CustomURLSearchParams,
      request: {} as YourRequestObject<CustomRequestInit>,
      session: {} as CustomSessionType,
      signedCookies: {} as Record<string, string>,
      currentUser: {} as UserWithoutSensitiveData | null,

      get: (name: string) => undefined,
      cache: {} as RequestCache,
      headers: {
        accepts: '',
      },

      connection: socket,
      socket: socket,

      // Implementation of the 'accepts' method
      accepts: (types: string | string[] | undefined) => {
        if (req.headers === undefined) {
          return undefined
        }

        // Rest of implementation
      },
    }
  }
}

// Define a function to glenerate default Axios request options
export function getDefaultAxiosOptions(req: CustomRequestWithContext<MyContext<{}>>) {
  // Determine if the request is an API request
  const isApiRequest = req.headers?.referer?.includes(`${req.headers?.origin}/api/`)

  // Retrieve accessToken from the request object
  const { accessToken } = req

  const commandHeaders = {
    accepts: '',
  }

  const filteredCommonHeaders: CustomContextHeaders = Object.fromEntries(
    Object.entries(commonHeaders).filter(([_, value]) => typeof value === 'string'),
  )

  // Define the options object with the necessary headers
  const options: RequestOptions = {
    prisma,
    req: {} as CustomRequestTypeOptions,
    baseURL: process.env.API_URL || '',
    responseType: 'json',
    id: '',
    ctx: {
      headers: {
        // Spread the properties of common headers
        ...commonHeaders,
        // Add the x-poser-by header
        'x-powered-by': 'test-server',
        // Add the x-test-header header
        'x-test-header': 'true',
        // Add the access-control-allow-origin header
        'Access-Control-Allow-Origin': '*',
        // Add the authorization header
        Authorization: `Bearer ${accessToken || ''}`,
        // Add the content-type header
        'Content-Type': 'application/json',
        // Define default options for the range parser
        'Client-IP': specificSocket?.handshake?.address || '',
        // Define session storage for user session information
        sessionStore: sessionStorage.Store,
        // Add the referer header if it is an API request
        ...(isApiRequest && { Referer: req.headers?.referer }),
        // Add the request-policy header if it is an API request
        ...(isApiRequest && { 'Referer-Policy': 'strict-origin-when-cross-origin' }),
        'set-cookie': [],
        // accepts(types: string | string[] | undefined) {
        //   if (typeof myContext?.accepts === 'undefined') {
        //     return undefined;
        //   } else {
        //     const result = myContext.accepts(Array.isArray(types) ? types : [types] as unknown as string);
        //     return Array.isArray(result) ? result : [result];
        //   }
        // }
        // ,
        'accept-language': '',
        'accep-patch': '',
        'accept-range': '',
      },  
      accessToken: accessToken,
    },
    headers: { ...filteredCommonHeaders },
  }

  return options
}
