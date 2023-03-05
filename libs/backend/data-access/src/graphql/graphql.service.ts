//backend/data-access/src/graphql/graphql.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { GraphQLSchema, printSchema } from 'graphql';
import { makeSchema } from 'nexus'; // <-- Update import statement
import { join } from 'path';
import { BackendDataAccessService } from '../../../../backend/data-access/src';

import { RootTypes } from './types';

@Injectable()
export class GraphqlService {
  constructor(private readonly data: BackendDataAccessService) {}

  async createSchema(): Promise<GraphQLSchema> {
    const generatedTypesPath = join(process.cwd(), 'libs/backend/data-access/src/graphql/nexus.schema.generated.d.ts');
    const schemaPath = join(process.cwd(), 'libs/backend/data-access/src/graphql/schema.graphql');

    const generatedSchema = makeSchema({
      types: RootTypes,
      outputs: {
        schema: schemaPath,
        typegen: generatedTypesPath,
      },
      contextType: {
        module: join(process.cwd(), 'libs/backend/data-access/src/backenddataaccess.service.ts'),
        export: 'BackendDataAccessService',
      },
    });
    fs.writeFileSync(schemaPath, printSchema(generatedSchema));

    return generatedSchema;
  }
}
