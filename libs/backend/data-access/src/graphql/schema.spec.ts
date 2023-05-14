import { graphql, GraphQLSchema } from 'graphql';
import { schema } from './nexus.schema';

describe('schema', () => {
  it('should return "world" when running hello query', async () => {
    const query = `query { hello }`
    const context = { currentUser: null, request: {}, response: {} }
    const result = await graphql({
      schema: schema as GraphQLSchema,
      source: query,
      contextValue: context,
    })
    expect(result.data?.hello).toEqual('world')
  })
})
