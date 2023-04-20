//Users/dixiejones/Development/main-app/appository-react/apps/backend/api/src/server.ts
import { ApolloServer, ApolloServerOptionsWithSchema, BaseContext } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { LoggingMiddleware, PermissionsMiddleware, PermissionsModule, PermissionsModuleOptions, getContext, nexusSchema } from '@appository/backend/data-access'
import { applyMiddleware } from 'graphql-middleware'
import { makeSchema } from 'nexus'
import { permissions } from './middleware/permissions/shield/shield-permissions'
const express = require('express')
const json = require('body-parser')
const cors = require('cors')
const http = require('http')

export const app = express()
const httpServer = http.createServer(app)

const options: PermissionsModuleOptions = {
  basePath: '/api',
  [Symbol.iterator]: function * (){
    yield this.basePath
  }
  // permissions: {}
}
const permissionsMiddleware =  new PermissionsMiddleware(options).use.bind(new PermissionsMiddleware(options))
app.use(permissionsMiddleware)

const schema = makeSchema({
  types: [nexusSchema],
})

const schemaWithMiddleware = applyMiddleware(schema, permissions)

const context = getContext()

const apolloServer = new ApolloServer({
  schema: schemaWithMiddleware,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  context: async ({ req }: {req: Request}) => {
    return {
      request: req,
    }
  },
} as ApolloServerOptionsWithSchema<BaseContext>)

app.use(LoggingMiddleware.createMiddleware(new LoggingMiddleware()));
app.use(express.json())
// Move the `path` property here
const graphqlPath = '/graphql'
app.use(
  graphqlPath,
  express.urlencoded({ extended: true }),
  express.json(),
  express.text(),
  expressMiddleware(apolloServer),
)

// Register permissions middleware globally
app.use(permissionsMiddleware)
// Apply cors and body parser middleware
app.use(cors(), json());

// Configure PermissionsModule
const permissionsModule = new PermissionsModule()
permissionsModule.configure(app) // Pass the app instance to the configure method of PermissionsModule

const port = process.env.PORT || 4000

apolloServer.start().then(() => {
  httpServer.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${graphqlPath}`)
  })
})
