//Users/dixiejones/Development/main-app/appository-react/apps/backend/api/src/server.ts
import { ApolloServer, ApolloServerOptionsWithSchema, BaseContext } from '@apollo/server'
import { json } from 'body-parser'
import express = require('express')
import http = require('http')
import cors = require('cors')

import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { createContext } from '@appository/backend/common'
import { nexusSchema, PermissionsMiddleware, PermissionsModule } from '@appository/backend/data-access'
import { applyMiddleware } from 'graphql-middleware'
import { makeSchema } from 'nexus'

  export const app = express()
  const httpServer = http.createServer(app)

  const permissionsMiddleware = PermissionsMiddleware.createMiddleware()
  app.use(permissionsMiddleware)

  const schema = makeSchema({
    types: [nexusSchema],
  })

  const schemaWithMiddleware = applyMiddleware(schema)

  const context = createContext()

  const apolloServer = new ApolloServer({
    schema: schemaWithMiddleware,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req }) => {
      return {
        request: req,
      }
    },
  } as ApolloServerOptionsWithSchema<BaseContext>)

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
  app.use(PermissionsMiddleware.createMiddleware())
  // Apply cors and body parser middleware
  app.use(cors<cors.CorsRequest>(), json())

  // Configure PermissionsModule
  const permissionsModule = new PermissionsModule()
  permissionsModule.configure(app) // Pass the app instance to the configure method of PermissionsModule

  const port = process.env.PORT || 4000

  
  apolloServer.start().then(() => {
    httpServer.listen(port, () => {
      console.log(`🚀 Server ready at http://localhost:${port}${graphqlPath}`)
    })
  })

