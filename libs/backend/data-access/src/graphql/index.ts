// data-access/graphql/index.ts

import { queryType, stringArg } from 'nexus';

export const Query = queryType({
  definition(t) {
    t.string('hello', {
      args: { name: stringArg({ }) },
      resolve: (parent, { name }) => `Hello ${name || 'World'}!`,
    });
  },
});
