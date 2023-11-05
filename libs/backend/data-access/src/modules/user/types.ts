import { Context } from '@appository/backend/data-access'
import { Prisma, User } from '@prisma/client'
import { enumType, extendType, nullable, objectType } from 'nexus'
import { hashPassword } from '../../interfaces/auth/user-with-password-hash'

export const UserRoleEnum = enumType({
  name: 'UserRoleEnum',
  members: ['ADMIN', 'USER', 'MODERATOR', 'EDITOR'],
})

export const allowedRoles = Object.values(UserRoleEnum) as string[]

// Define the User type
export const UserType = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('name')
    t.string('email')
    t.string('username')
  //   t.nonNull.field('userProfile', {
  //     type: 'UserProfile',
  //     resolve: async (parent: UserWithoutSensitiveData, _args, ctx: Context) => {
  //       const userProfile = await ctx.getPrisma().userProfile.findUnique({
  //         where: {
  //           userId: parent.id,
  //         },
  //       })
  //       if (!userProfile) {
  //         throw new Error(`User with ID ${parent.id} does not have a profile`)
  //       }
  //       return userProfile
  //     },
  //   })
  },
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.nonNull.string('username')
    t.list.field('posts', { type: 'Post' })
    t.field('role', {
      type: 'UserRoleEnum',
    })
    t.nonNull.string('createdAt')
    t.string('updatedAt')
    t.nonNull.string('passwordHash')
    
  },
})

export const Query = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve: async (_parent, _args, ctx: Context) => {
        return ctx.getPrisma().user.findMany()
      },
    })
    t.field('user', {
      type: 'User',
      args: { id: 'Int' },
      resolve: async (_parent, { id }, ctx: Context) => {
        return ctx.getPrisma().user.findUnique({
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
        data: 'UserInput',
      },
      resolve: async (_parent, { data }, ctx: Context) => {
        const { name, email, password, confirmPassword } = data

        if (password !== confirmPassword) {
          throw new Error('Passwords do not match, please try again')
        }

        const passwordHash = await hashPassword(password)
        return ctx.getPrisma().user.create({
          data: {
            name,
            email,
            passwordHash,
          }as Prisma.UserCreateInput,
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
      resolve: async (_parent, { id, name, email }, ctx: Context) => {
        return ctx.getPrisma().user.update({
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
      resolve: async (_parent, { id }, ctx: Context) => {
        return ctx.getPrisma().user.delete({
          where: {
            id,
          },
        })
      },
    })
  },
})
export default nullable(User)
