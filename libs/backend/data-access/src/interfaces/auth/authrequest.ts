import { objectType } from 'nexus';

export const AuthenticatedUser = objectType({
  name: 'AuthenticatedUser',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('email')
    t.list.field('posts', { type: 'Post' })
    t.field('role', {
      type: 'UserRoleEnum',
    })
    t.string('createdAt')
    t.string('updatedAt')
  },
});