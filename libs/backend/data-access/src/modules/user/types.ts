import { Context } from '@appository/backend/common';
import { hash } from 'bcryptjs';
import { enumType, extendType, objectType } from 'nexus';

export const UserRoleEnum = enumType({
  name: 'UserRoleEnum',
  members: [
    'ADMIN',
    'USER',
    'MODERATOR'
  ],
})

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('name')
    t.string('email')
    t.list.field('posts', { type: 'Post' })
    t.field('role', {
      type: 'UserRoleEnum',
    })
    t.string('createdAt')
    t.string('updatedAt')
  },
})

export const Query = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve: async (_parent, _args, ctx:Context) => {
        return ctx.prisma.user.findMany()
      },
    })
    t.field('user', {
      type: 'User',
      args: { id: 'Int' },
      resolve: async (_parent, { id }, ctx:Context) => {
        return ctx.prisma.user.findUnique({
          where: { id },
        })
      },
    })
  },
})

export const Mutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        data: 'UserInput'
      },
      resolve: async (_parent, { data }, ctx:Context) => {
        const { name, email, password, confirmPassword } = data

        if (password !== confirmPassword) {
          throw new Error('Passwords do not match, please try again')
        }

        const passwordHash = await hash(password, 10)
        return ctx.prisma.user.create({
          data: {
            name,
            email,
            passwordHash
          },
        })
      },
    })
    t.field('updateUser', {
      type: 'User',
      args: {
        id: 'id',
        name: 'String',
        email: 'String',
      },
      resolve: async (_parent, { id, name, email }, ctx:Context) => {
        return ctx.prisma.user.update({
          data: {
            name,
            email,
          },
          where: {
            id,
          },
        })
      },
    })
    t.field('deleteUser', {
      type: 'User',
      args: {
        id: 'id',
      },
      resolve: async (_parent, { id }, ctx:Context) => {
        return ctx.prisma.user.delete({
          where: {
            id,
          },
        })
      },
    })
  },
})
