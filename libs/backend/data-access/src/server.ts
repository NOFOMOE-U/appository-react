  //Users/dixiejones/Development/main-app/appository-react/apps/backend/api/src/server.ts
  import { ApolloServer, ApolloServerOptionsWithSchema, BaseContext } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import {
  CustomRequestWithContext,
  LoggingMiddleware,
  MyContext,
  MyCustomRequest,
  PermissionsMiddleware,
  PermissionsModule,
  PermissionsModuleOptions,
  UserService,
  UserWithAccessToken,
  YourRequestObject,
  getContext,
  makeRequest,
  nexusSchema
} from '@appository/backend/data-access'
import { NextFunction, Request, Response } from 'express'
import session from 'express-session'
import { applyMiddleware } from 'graphql-middleware'
import { makeSchema } from 'nexus'
import { Namespace, Server } from 'socket.io'; // Import the necessary types
import { processRequest } from './make-api/default-options'
import { makeApiRequest } from './make-api/make-api-request'
import errorMessages from './middleware/permissions/error-messages'
import { permissions } from './middleware/permissions/shield/shield-permissions'
import { userRegistrationSchema } from './middleware/validation-yup-schemas/validate-email'

  require('dotenv').config()
  const json = require('body-parser')
  const cors = require('cors')
  const http = require('http')

  export const app = require('express')()

  const sessionStore = new sessionStorage.Store()
  app.use(
    session({
      secret: 'your-secret-key', // replace with secret key
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
    }),
  )

  let userService: UserService
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
    console.log(socketInstance.auth) // Access and log the 'auth' property
    console.log(socketInstance.previousSession) // Access and log the 'previousSession' property
  }

  const options: PermissionsModuleOptions = {
    basePath: '/api',
    [Symbol.iterator]: function* () {
      yield this.basePath
    },
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
        user: req.session.user
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



app.post('/register', (req: YourRequestObject<{}>, res: Response, next: NextFunction) => {
  const { body } = req;
  
  // Validate the user registration data
  userRegistrationSchema.validate(body)
    .then((validData) => {
      // Data is valid, proceed with user registration
      // For example, save user to the database
      // userController.register(validData);
      res.status(201).json({ message: 'User registered successfully' });
    })
    .catch((error) => {
      // Data is invalid, send an error response
      res.status(400).json({ error: 'Validation Error', message: errorMessages.invalidRegistration });
    });
});


  app.post('/login', ensureAuthenticated, async (req: MyContext<UserWithAccessToken>, res: Response, next: NextFunction) => {
    // Assuming user data is already stored in the session during authentication
    const user = req.session.user;

    if (user) {
      const currentUser: UserWithAccessToken  = {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        passwordHash: user.passwordHash || undefined,
        roles: user.roles,
        createdAt: user.createdAt, 
        updatedAt: user.updatedAt, 
        userProfileId:  user.userProfileId,
        accessToken: user.accessToken,
        resetPasswordToken: undefined,
      };

      res.json({ currentUser });
    } else {
      // Handle the case where the user is not found in the session
      res.status(401).send('Unauthorized');
    }
  });


  app.post('/logout', (req: CustomRequestWithContext<MyContext<{}>>, res: Response) => {
    req.clearAuthenticatedUser();
    res.json({message: 'Logged out successfully'})
  })


  export async function ensureAuthenticated(req: YourRequestObject<{}>, res: Response, next: NextFunction) {
    if (!req.session.yourSessionKey) {
      return res.status(401).send('Unauthorized')
    } else {


      if(!req.session.yourSessionKey){
        return res.status(401).send('Unauthorized')
      } else {

        // verify if a user is stored in the session
        const user: UserWithAccessToken | undefined = req.session.user
        
        if (user) {
          //if user found, set it in the req.user property
          req.user = user
        }
        // authentication success,
        next()
      }
    }
  }

  export function authenticationMiddlware(req: YourRequestObject<{}>, res: Response, next: NextFunction) {
    ensureAuthenticated(req, res, next)
  }

  app.get('/protected', ensureAuthenticated, (req: YourRequestObject<{}>, res: Response, next: NextFunction) => {
    if (req.session.yourSessionKey) {
      res.send('You are authenticated!')
    } else {
      res.status(401).send('Unauthorized')
    }
  })

  app.get('/profile', ensureAuthenticated, (req: YourRequestObject<{}>, res: Response) => {
    if (!req.session.user) {
      res.send('Not authenticated')
      return res.status(401).send(errorMessages.notAuthenticated)
    }

    if (req.session.user) {
      const user = req.session.user
      const userId = user.id
      res.send(`Authenticated user ID: ${userId}`)
    }
  })

  // Other route handlers
  // ...

  app.get('/your-route', async (req: YourRequestObject<{}>, res: Response, next: NextFunction) => {
    processRequest(req, res, next)
    
    // Create an instance of MyCustomRequest and provide the required properties
    try {
      const myCustomReq: MyCustomRequest<MyContext> = new MyCustomRequest({
        query: req.session.query,
        params: req.session.params,
        user: req.session.currentUser,
        customCache: req.session.customCache, // Provide your customCache data here
        session: req.session,
        accepts: req.session.accepts,
        request: req.session.request,
        body: req.session.body,
        requestBody: req.session.requestBody,
        URLSearchParams: req.URLSearchParams
        // Add other required properties
      },
      context,
      userService // pass userService instance
      )

      await makeRequest(myCustomReq)
      // Handle success or response from makeRequest if needed
      res.status(200).send('Request sent successfully')
    } catch (error) {
      // Handle errors from makeRequest
      console.error(error)
      res.sendStatus(500) // Changed to sendStatus() instead of status()
    }
  })


  app.get('/make-api-request', async (req: CustomRequestWithContext<MyContext<{}>>, res: Response, next: NextFunction) => {
      try {
        await makeApiRequest(req)

        res.status(200).json({ message: 'API request processed successfully' })
      } catch (error) {
        console.error('API request error: ', error)

        if (error instanceof Error) {
          const errorMessage = error.message

          if (errorMessage === 'Oh no, we have an error') {
            res.status(400).json({ error: errorMessages.badRequest })
          } else if (errorMessage === 'Seems to be an internal error') {
            res.status(500).json({ error: errorMessages.internalServerError, message: 'An unexpected error occurred' })
          } else {
            res.status(500).json({ error: errorMessages.unknownError })
          }
        } else {
          res.status(500).json({ error: errorMessages.unknownError })
        }
      }
    },
  )


  app.get('/example', (req: CustomRequestWithContext<MyContext<{}>>, res: Response) => {
    // Access custom properties and methods from the custom request object
    const customProp = req.customProp
    // Access standar request properties
    const userId = req.userId
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
