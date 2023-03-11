// data-access/graphql/nexus.ts

import { makeSchema } from 'nexus';
import * as path from 'path';
import { join } from 'path';
import * as types from './types';
import { RootTypes } from './types';

import * as UserModule from './../modules/user/user.module';

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