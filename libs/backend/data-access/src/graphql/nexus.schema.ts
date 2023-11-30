///graphql/nexus.schema.ts

import { RootTypes } from '@appository/backend/data-access';
import { UserModule } from '@appository/backend/users';
import { GraphQLSchema } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import { makeSchema } from 'nexus';
import { join } from 'path';
import { permissions } from '../middleware/permissions/shield/shield-permissions';
import { Configuration } from '../modules/database';
import * as types from './type';

export interface GraphQLSchemaWithProps extends GraphQLSchema {
  query: any;
  mutation: any;
  subscription: any;
  context: any;
}

export const nexusSchema = makeSchema({
  types: [Configuration, RootTypes, UserModule, types],
  outputs: {
    schema: __dirname + '/schema.graphql',
    typegen: join(process.cwd(), 'node_modules/@types/nexus-typegen/index.d.ts'),
  },
  contextType: {
    // Use existing contextType definition- this works and was the orignia code... 
    // module: path.dirname('/context'),
    //trying per request
    module: join(process.cwd(), 'context'),
    export: 'Context',
  },
  shouldGenerateArtifacts: true,
})

export const schema = applyMiddleware(nexusSchema, permissions) as GraphQLSchema;

export const createTestSchema = () => {
  return schema;
}