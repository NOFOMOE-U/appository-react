//Users/dixiejones/Development/main-app/appository-react/apps/backend/api/src/server.ts
import { ApolloServer, ApolloServerOptionsWithSchema, BaseContext } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import {
  CustomRequestWithContext,
  CustomSessionType,
  LoggingMiddleware,
  MyContext,
  MyCustomRequest,
  PermissionsMiddleware,
  PermissionsModule,
  PermissionsModuleOptions,
  getContext,
  makeRequest,
  nexusSchema,
} from '@appository/backend/data-access'
import { NextFunction, Request } from 'express'
import session, { Session, SessionData } from 'express-session'
import { applyMiddleware } from 'graphql-middleware'
import { makeSchema } from 'nexus'
import { Namespace, Server } from 'socket.io'; // Import the necessary types
import { processRequest } from './make-api/default-options'
import { makeApiRequest } from './make-api/make-api-request'
import errorMessages from './middleware/permissions/error-messages'
import { isAuthenticatedUser } from './middleware/permissions/rules/is-authenticated-user'
import { permissions } from './middleware/permissions/shield/shield-permissions'

const json = require('body-parser')
const cors = require('cors')
const http = require('http')

export const app = require('express')()

app.use(
  session({
    secret: 'your-secret-key', // replace with secret key
    resave: false,
    saveUninitialized: false,
  }),
)

const httpServer = http.createServer(app) // Create an HTTP server for your Express app

const io = new Server(httpServer) // Create a Socket.IO server instance

//export socket connected in default options
export { io as socket }

// Define a Namespace instance (provide appropriate values)
const nsp: Namespace = io.of('/yourNamespaceName')

// Access the connected clients
const clients = nsp.sockets

//Get the client with the specifiedd socked ID
const socketId = 'yourSocketId'
const client = clients.get(socketId)


if (client) {
  // Define the auth object (provide appropriate values)
  const auth = {
    username: 'yourUsername',
    token: 'yourAuthToken',
  }

  // Create the socket with the obtained instances, auth, and the previous session
  const clients = nsp.sockets

  // Define the previousSession object if needed
  const previousSession = {
    sessionId: 'yourPreviousSessionId',
    sessionData: 'yourPreviousSessionData',
    sid: 'yourSessionId', // Provide an appropriate session ID
    pid: 'yourProcessId', // Provide an appropriate process ID
    rooms: ['room1', 'room2'], // Provide an array of rooms if needed
    data: {},
    missedPackets: [[]],
  }
  class YourSocketClass {

    client: any
    auth: any
    previousSession: any
    
    constructor(client: any, auth: any, previousSession: any) {
      this.client = client
      this.auth = auth
      this.previousSession = previousSession
    }
  }

  const socketInstance = new YourSocketClass(client, auth, previousSession)
  console.log(socketInstance.client) // Access and log the 'client' property
  console.log(socketInstance.auth); // Access and log the 'auth' property
  console.log(socketInstance.previousSession); // Access and log the 'previousSession' property

}

const options: PermissionsModuleOptions = {
  basePath: '/api',
  [Symbol.iterator]: function* () {
    yield this.basePath
  },
  // permissions: {}
}

// Create and configure the PermissionsMiddleware
const permissionsMiddleware = new PermissionsMiddleware(options).use.bind(new PermissionsMiddleware(options))

//Add permissions middlewaer to the Express app
app.use(permissionsMiddleware)

const schema = makeSchema({
  types: [nexusSchema],
})

//Appy middleware to the schema (e.g., permmissions)
const schemaWithMiddleware = applyMiddleware(schema, permissions)

// Get the context
const context = getContext()

//Create an Apollo Server instance
const apolloServer = new ApolloServer({
  schema: schemaWithMiddleware,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  context: async ({ req }: { req: Request }) => {
    return {
      request: req,
    }
  },
} as ApolloServerOptionsWithSchema<BaseContext>)

app.use(LoggingMiddleware.createMiddleware(new LoggingMiddleware()))
app.use(require('express').json())

// Move the `path` property here
const graphqlPath = '/graphql'

app.use(
  graphqlPath,
  require('express').urlencoded({ extended: true }),
  require('express').json(),
  require('express').text(),
  expressMiddleware(apolloServer),
)

app.post('/login', (req: Request, res: Response) => {
  // Check credentials and authenticate the user
  // If authentication is successful, store data in the session
  req.session.yourSessionKey = 'yourTokenValue'; // Replace 'yourSessionKey' and 'yourTokenValue'
  // Redirect or send a response
});


export function ensureAuthenticated({ req, res, next }: { req: Request; res: Response; next: NextFunction }) { 
  if (!req.session.yourSessionKey) {
   return (res as any).status(401).send('Unauthorized');
  }
  // authentication success, 
    next
}

export function authenticationMiddlware(req: Request, res: Response, next: NextFunction) { 
  ensureAuthenticated({
    req: req,
    res: res,
    next: next
  })
}

app.get('/protected', isAuthenticatedUser, (req: Request, res: Response, next: NextFunction) => {
  ensureAuthenticated({
      req, res, next: (err: any) => {

        if (err) {
          return (res as any).status(401).send('Unauthorized')
        }
      }
  })
  
  
  // Retrieve data from the session
  const sessionData = req.session as Session & Partial<SessionData>
  const token = sessionData.yourSessionKey; // Replace 'yourSessionKey'
  // Use the data, e.g., for authentication or authorization
  if (token) {
    // User is authenticated
    // Continue with protected route logic
    (res as any).status(200).send('Authenticated'); // Replace with your logic for authenticated users
  } else {
    // User is not authenticated
    // Redirect or send an error response
    (res as any).status(401).send('Unauthorized'); // You can customize the status code and response message
    (res as any).redirected('/login');

  }
});

app.get('/your-route', async (req: Request, res: Response, next: NextFunction) => {
  processRequest(req, res, next)
  // Create an instance of MyCustomRequest and provide the required properties
  try {
    const myCustomReq: MyCustomRequest<MyContext> = new MyCustomRequest({
      query: req.query as Record<string, any>,
      params: req.params as Record<string, any>,
      customCache: {}, // Provide your customCache data here
      session: {} as CustomSessionType,
      accepts: req.accepts,
      // Add other required properties
    })

    await makeRequest(myCustomReq)
    // Handle success or response from makeRequest if needed
    ;(res as any).status(200).send('Request sent successfully')
  } catch (error) {
    // Handle errors from makeRequest
    console.error(error)
    ;(res as any).sendStatus(500) // Changed to sendStatus() instead of status()
  }
})

app.get('/make-api-request', async (req: Request & CustomRequestWithContext<MyContext<{}>>, res: Response, next: NextFunction) => {
  try {
    await makeApiRequest(req);

    (res as any).status(200).json({message: 'API request processed successfully'})
  } catch (error) {
    console.error('API request error: ', error);

    if (error instanceof Error) {
      const errorMessage = error.message

      if (errorMessage === 'Oh no, we have an error'){
        (res as any).status(400).json({ error: errorMessages.badRequest })
      } else if(errorMessage === 'Seems to be an internal error'){
        (res as any).status(500).json({error: errorMessages.internalServerError, message: 'An unexpected error occurred'})
      } else{
      (res as any).status(500).json({error: errorMessages.unknownError})
      }
    } else {
      (res as any).status(500).json({error: errorMessages.unknownError})
    }
  }
})

// Register permissions middleware globally
app.use(authenticationMiddlware, permissionsMiddleware)

// Apply cors and body parser middleware
app.use(cors(), json())

// Configure PermissionsModule
const permissionsModule = new PermissionsModule()
permissionsModule.configure(app) // Pass the app instance to the configure method of PermissionsModule

const port = process.env.PORT || 4000

apolloServer.start().then(() => {
  httpServer.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${graphqlPath}`)
  })
})
