import { ApolloServer, BaseContext } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/dist/esm/express4'
import { MyContext } from '@appository/backend/context-system'
import { app } from '../../../server'

  // Move the `path` property here
  export const graphqlPath = '/graphql'
  const myApolloServerContext = {} as  ApolloServer<BaseContext> & MyContext
  app.use(
    graphqlPath,
    require('express').urlencoded({ extended: true }),
    require('express').json(),
    require('express').text(),
    expressMiddleware(myApolloServerContext),
  )