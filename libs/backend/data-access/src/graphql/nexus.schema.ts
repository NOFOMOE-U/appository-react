///graphql/nexus.schema.ts

import { RootTypes } from '@appository/backend/data-access';
import { applyMiddleware } from 'graphql-middleware';
import { makeSchema } from 'nexus';
import * as path from 'path';
import { join } from 'path';
import { permissions } from '../middleware/permissions/shield/shield-permissions';
import * as UserModule from '../modules/user/user.module';
import * as types from './types';

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
  // sourceTypes: {
  //   modules: [
  //     {
  //       // module: '@prisma/client',
  //       module: '@prisma/client',
  //       alias: 'prisma',
  //     },
  //     {
  //       module: path.dirname('/context'),
  //       alias: 'ContextModule',
  //     },
  //   ],
  // },
})

export const schema = applyMiddleware(nexusSchema, permissions);
