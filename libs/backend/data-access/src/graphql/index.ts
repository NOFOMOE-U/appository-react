// data-access/src/graphql/index.ts
import { makeSchema } from 'nexus';
import { join } from 'path';

import * as UserModule from './../modules/user/user.module';

export const schema = makeSchema({
  types: [UserModule],
  outputs: {
    schema: join(process.cwd(), 'schema.graphql'),
    typegen: join(process.cwd(), 'node_modules/@types/nexus-typegen/index.d.ts'),
  },
  contextType: {
    module: join(process.cwd(), '../../../common/src/context/context.ts'),
    export: 'Context',
  },
});






