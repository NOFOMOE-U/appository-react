import { graphql } from 'graphql';
import { createTestContext } from '../context/testing';
import { schema } from './nexus.schema';

describe('nexusSchema', () => {
  let context: ReturnType<typeof createTestContext>;

  beforeAll(async () => {
    context = await createTestContext();
  });

  afterAll(async () => {
    await context.prisma.$disconnect();
  });

  it('should be a valid schema', async () => {
    const query = `query { __schema { types { name } } }`;
    const result = await graphql({
      schema: schema,
      source: query,
      contextValue: {
        prisma: context.prisma,
        request: {},
        response: {},
        user: {},
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toMatchSnapshot();
  });

  it('should return expected result for query', async () => {
    const query = `
      query {
        someQuery {
          someField
        }
      }
    `;

    const result = await graphql({
      schema: schema,
      source: query,
      contextValue: {
        prisma: context.prisma,
        request: {},
        response: {},
        user: {},
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      someQuery: {
        someField: 'expectedValue',
      },
    });
  });
});
