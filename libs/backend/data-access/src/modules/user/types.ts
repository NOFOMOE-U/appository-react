// types.ts
import { extendType, objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('email')
    t.string('password')
    // t.field('posts')
    t.field('role', {
      type: 'UserRole',
      resolve: (root, args, ctx) => {
        // Resolve the role field if needed
      },
    })
    t.string('createdAt')
    t.string('updatedAt')
  },
})

// export const CreateUserInput = inputObjectType({
//   name: 'CreateUserInput',
//   definition(t) {
//     t.string('name')
//     t.string('email')
//     t.string('password')
//   }
// })

export const Query = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve: async (_parent, _args, { prisma }) => {
        return prisma.user.findMany()
      },
    })
    t.field('user', {
      type: 'User',
      args: { id: 'Int' },
      resolve: async (_parent, { id }, { prisma }) => {
        return prisma.user.findUnique({
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
        name: 'String',
        email: 'String',
      },
      resolve: async (_parent, { name, email }, { prisma }) => {
        return prisma.user.create({
          data: {
            name,
            email,
          },
        })
      },
    })
    t.field('updateUser', {
      type: 'User',
      args: {
        id: 'Int',
        name: 'String',
        email: 'String',
      },
      resolve: async (_parent, { id, name, email }, { prisma }) => {
        return prisma.user.update({
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
        id: 'Int',
      },
      resolve: async (_parent, { id }, { prisma }) => {
        return prisma.user.delete({
          where: {
            id,
          },
        })
      },
    })
  },
})
