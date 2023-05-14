import { graphql } from 'graphql';
import { makeSchema, objectType } from 'nexus';
import { AuthenticatedUserType } from './auth-request';

describe('AuthenticatedUserType', () => {
  const PostType = objectType({
    name: 'Post',
    definition(t) {
      t.string('id')
      t.string('title')
      t.string('body')
    },
  })

  const schema = makeSchema({
    types: [AuthenticatedUserType, PostType],
    outputs: false,
  })

  it('should return correct fields', async () => {
    const query = `query {
      user {
        id
        name
        email
        posts {
          id
          title
          body
        }
        role
        createdAt
        updatedAt
      }
    }`

    const result = await graphql(schema, query, {}, {}, {})
    const user = result.data?.user

    expect(user).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      email: expect.any(String),
      posts: expect.any(Array),
      role: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
    expect(user.posts[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
    })
  })
})
