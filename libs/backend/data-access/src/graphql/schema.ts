//backend/data-access/src/graphql/schema.ts
import { makeSchema } from 'nexus';
import { RootTypes } from './types';

export const schema = makeSchema({
  types: RootTypes,
});

