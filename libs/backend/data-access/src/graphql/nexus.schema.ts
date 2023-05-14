///graphql/nexus.schema.ts

import { RootTypes } from '@appository/backend/data-access';
import { GraphQLSchema } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import { makeSchema } from 'nexus';
import * as path from 'path';
import { join } from 'path';
import { permissions } from '../middleware/permissions/shield/shield-permissions';
import * as UserModule from '../modules/user/user.module';
import * as types from './type';

export interface GraphQLSchemaWithProps extends GraphQLSchema {
  query: any;
  mutation: any;
  subscription: any;
  context: any;
}

export const nexusSchema = makeSchema({
  types: [RootTypes, types, UserModule],
  outputs: {
    schema: __dirname + '/schema.graphql',
    typegen: join(process.cwd(), 'node_modules/@types/nexus-typegen/index.d.ts'),
  },
  contextType: {
    module: path.dirname('/context'),
    export: 'Context',
  },
  shouldGenerateArtifacts: true,
})

export const schema = applyMiddleware(nexusSchema, permissions) as GraphQLSchema;

export const createTestSchema = () => {
  return schema;
}