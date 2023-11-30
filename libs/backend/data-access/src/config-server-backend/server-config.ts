// config/server-config.ts
import { ApolloServer, ApolloServerOptionsWithSchema } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { nexusSchema } from '@appository/backend/data-access';
import { applyMiddleware } from 'graphql-middleware';
import { makeSchema } from 'nexus';

import { MyContext } from '@appository/backend/context-system';
import { permissions } from '../middleware/permissions/shield/shield-permissions';
import { app, httpServer } from '../server';
// Create a custom context type that includes req and res


const schema = makeSchema({
  types: [nexusSchema],
});

const schemaWithMiddleware = applyMiddleware(schema, permissions);

export const apolloServer = new ApolloServer({
  schema: schemaWithMiddleware,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  context: ({ req, res }: MyContext) => {
    return {
      req,
      res
    };
  }  
} as ApolloServerOptionsWithSchema<MyContext>)

export { app, httpServer };

