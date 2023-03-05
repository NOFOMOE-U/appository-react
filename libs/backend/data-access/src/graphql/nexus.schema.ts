// data-access/graphql/nexus.ts

import { makeSchema } from 'nexus'
import * as types from './types'

export const schema = makeSchema({
  types,
  outputs: {
    schema: __dirname + '/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('../context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/Client',
        alias: 'prisma',
      },
      {
        module: require.resolve('../context'),
        alias: 'ContextModule',
      },
    ],
  },
})
