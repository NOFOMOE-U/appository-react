import { expressMiddleware } from '@apollo/server/dist/esm/express4'
import { apolloServer } from '../../config-server-backend/server-config'
import { app } from '../../server'

  // Move the `path` property here
  export const graphqlPath = '/graphql'

  app.use(
    graphqlPath,
    require('express').urlencoded({ extended: true }),
    require('express').json(),
    require('express').text(),
    expressMiddleware(apolloServer),
  )