  //Users/dixiejones/Development/main-app/appository-react/apps/backend/api/src/server.ts
  import { ApolloServer, ApolloServerOptionsWithSchema, BaseContext } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { CustomURLSearchParams, MyContext } from '@appository/backend/context-system'
import {
  CustomRequestWithContext,

  LoggingMiddleware,

  MyCustomRequest,
  PermissionsMiddleware,
  PermissionsModule,
  PermissionsModuleOptions,
  UserWithAccessToken,
  YourRequestObject,
  getContext,

  nexusSchema
} from '@appository/backend/data-access'
import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import session from 'express-session'
import { applyMiddleware } from 'graphql-middleware'
import { makeSchema } from 'nexus'
import { ParsedQs } from 'qs'
import { Namespace, Server } from 'socket.io'; // Import the necessary types
import { initAqua } from '../../communication/src/aqua/init-aqua'
import { CustomPrismaClient } from './lib/prisma/prisma'
import { AccessLevel } from './make-api/api-config/access-level'
import { processRequest } from './make-api/default-options'
import { ApiRequestFunction, makeApiRequest } from './make-api/make-api-request'
import { CustomRequestOptions } from './make-api/requests/custom-request-init'
import errorMessages from './middleware/error-messages'
import { permissions } from './middleware/permissions/shield/shield-permissions'
import { isAccessLevel } from './middleware/permissions/type-guards/access-level-guard'
import userRegistrationSchema from './middleware/validation-yup-schemas/validate-registration'
import { UserBehaviorController } from './modules/user/user-behavior-controller'
import UserManagerService from './modules/user/user-manager'
import { makeRequest } from './requests/log-http-response'

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

  const prisma = {} as CustomPrismaClient
  const httpServer = http.createServer(app) // Create an HTTP server for your Express app

  const io = new Server(httpServer) // Create a Socket.IO server instance

  //export socket and httpServer connected in default options
  export { httpServer, io as socket }

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


let prismaService = new PrismaClient()
const userManagerService: UserManagerService = new UserManagerService(prismaService)
const url =  new UserBehaviorController // url of the API
const userCustomSearchParams= {} as CustomURLSearchParams // Custom params

app.use(
  LoggingMiddleware.createMiddleware(
    new LoggingMiddleware(
      url,
      initAqua,
      userManagerService,
      userCustomSearchParams,

      // Add missing third argument here
    ),
  ),
)


  app.use(require('express').json())

  // Move the `path` property here
  const graphqlPath = '/graphql'


//review moved to app.use()
//   app.use(
//     graphqlPath,
//     require('express').urlencoded({ extended: true }),
//     require('express').json(),
//     require('express').text(),
//     expressMiddleware(apolloServer),
//   )

// app.use('/register')
app.post('/register')
app.post('/register', (req: YourRequestObject<{}>, res: Response, next: NextFunction) => {
  const { body } = req;
  
  // Validate the user registration data
  userRegistrationSchema.validate(body)
    .then((validData) => {
      // Data is valid, proceed with user registration
      const user = {
        ...validData,
        accessLevel: 'FREE'
      }
      // userController.register(validData);
      res.status(201).json({ message: 'User registered successfully' });
    })
    .catch((error) => {
      // Data is invalid, send an error response
      res.status(400).json({ error: errorMessages.invalidRegistration });
    });
});

// Express route handling the payment confirmation
app.post('/confirm-payment', async (req: YourRequestObject<CustomRequestWithContext<MyContext>>, res: Response, next: NextFunction) => {
  try {
    // Get user ID from request context
    const userId = req.context.user.id;
    // If your AccessLevel is updated from one to anther Level, 
    // update to new AccessLevel
    await userManagerService.updateUserAccessLevel(userId, accessLevel);
    // const userId = await userManagerService.getUserIdFromPayment(req); // Get user ID from payment request
    // req.user?.id // Retrieve theb user ID from the payment request
    const accessLevel = await userManagerService.updateUserAccessLevel(userId, AccessLevel.PAID);


    // Assuming 'userManagerService' is an instance of your userManagerService
    const updatedUser = await userManagerService.updateUserAccessLevel(userId, accessLevel);

    if (updatedUser) {
      res.status(200).json({ message: 'Access level updated successfully' });
    } else {
      res.status(404).json({ error: errorMessages.userNotFound });
    }
  } catch (error) {
    res.status(500).json({ error: errorMessages.failedUpdate });
  }
});



  app.post('/login', ensureAuthenticated, async (req: MyContext<UserWithAccessToken>, res: Response, next: NextFunction) => {
    // Assuming user data is already stored in the session during authentication
    const user = req.session.user;

    if (user) {
      await prisma.user.findUnique({
        where: {
          id: user.id
        }
      })
      .then(foundUser => {
        if (foundUser) {
          // generate JWT
          const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET as string);

          res.json({
            user: foundUser,
            token: token
          });
        } else {
          res.status(404).send('User not found');
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Error retrieving user');
      })
      const currentUser: UserWithAccessToken = {
        id: getUserId(),
        name: user.name,
        email: user.email,
        accessToken: generateAccessToken(user),
      };
        email: user.email as email,
        accessToken: generateAccessToken(user),
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
        const currentUser: UserWithAccessToken | undefined = req.session.currentUser
        
        if (currentUser) {
          //if user found, set it in the req.user property
          req.user = currentUser
        }
        // authentication success,
        next
      }
    }
  }



// // Register your routes
// app.post('/register', userRegistrationRoute);
// app.post('/confirm-payment', paymentConfirmationRoute);
// app.post('/login', loginRoute);
// app.post('/logout', logoutRoute);
// app.get('/protected', protectedRoute);
// app.get('/profile', profileRoute);
// app.get('/make-api-request', apiRequestRoute);
// app.get('/example', exampleRoute);



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

  app.get('/your-route', async (req: YourRequestObject<{}>, res: Response, next: NextFunction, accessLevel: AccessLevel | string) => {

    if (isAccessLevel(accessLevel)) {
    
      accessLevelToUse = accessLevel
      processRequest(req, res, next, accessLevelToUse)
    } else{
    

      const accessLevelString: string = accessLevel
      accessLevelToUse = accessLevelStriing
    const myCustomRequestOptions: CustomRequestOptions = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      userManagerService: userManagerService,
      accessLevel: accessLevelString,
      user: req.user
      }
      // Create an instance of MyCustomRequest and provide the required properties
    try {
      const myCustomReq: MyCustomRequest<MyContext> = new MyCustomRequest({
        method: 'POST',
        url: '/some-route',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {} as BodyInit | null | undefined, 
        userManagerService: userManagerService,
        accessLevel: accessLevelString,
        user: req.user,
        accepts: req.accepts,
        // other missing properties
      },
      userManagerService, // pass userManagerService instance
      context,
      )
      
      await makeRequest(myCustomReq)
      // Handle success or response from makeRequest if needed
      res.status(200).send('Request sent successfully')
    } catch (error) {
      // Handle errors from makeRequest
      console.error(error)
      res.sendStatus(500) // Changed to sendStatus() instead of status()
    }
  }
  })



app.get('/make-api-request', async (
  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  res: Response,
  method: 'GET',
  next: NextFunction,
  apiRequestFunction: ApiRequestFunction
) => {
      try {
        await makeApiRequest(
          req,
          'GET',
          userManagerService.getApiUrl as ApiRequestFunction,
          apiRequestFunction);

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
    // Access standard request properties
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
