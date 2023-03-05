//data-access/src/graphql/types.ts
import { objectType } from 'nexus';


// Define the Query type
const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('hello', {
      type: 'String',
      resolve: () => 'world',
    });
  },
});

// Define the Mutation type
const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.string('dummy', {
      resolve: () => 'Dummy Mutation',
    });
  },
});

// Define the User type
const UserType = objectType({
  name: 'User',
  definition(t) {
    t.id('id');
    t.string('name');
    t.string('email');
  },
});

// Export the root types array, which includes Query, Mutation, and User
export const RootTypes = [
  Query,
  Mutation,
  UserType,
];
