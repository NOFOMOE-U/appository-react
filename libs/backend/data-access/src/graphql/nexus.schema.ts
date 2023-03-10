// data-access/graphql/nexus.ts

import { GraphQLSchema } from 'graphql';
import { makeSchema } from 'nexus';
import * as types from './types';

export const schema = makeSchema({
  types,
  outputs: {
    schema: __dirname + '/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('../../../common/src/context/context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        // module: '@prisma/client',
        module: '@prisma/client',
        alias: 'prisma',
      },
      {
        module: require.resolve('../../../common/src/context/context'),
        alias: 'ContextModule',
      },
    ],
  },
}) as unknown as GraphQLSchema// added never used before
