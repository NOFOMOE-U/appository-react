import { objectType } from "nexus"
import { Context } from "../../context/context"

export const UserProfileType = objectType({
    name: 'UserProfile',
    definition(t) {
      t.nonNull.string('bio')
      t.nonNull.string('avatarUrl')
      t.nonNull.string('coverImageUrl')
      t.nonNull.field('createdAt', { type: 'DateTime' })
      t.field('updatedAt', { type: 'DateTime' })
    },
  })
  
  export const UserType = objectType({
    name: 'User',
    definition(t) {
      t.nonNull.string('id')
      t.nonNull.string('name')
      t.nonNull.string('email')
      t.list.field('posts', { type: 'Post' })
      t.field('role', { type: 'UserRoleEnum' })
      t.nonNull.field('createdAt', { type: 'DateTime' })
      t.field('updatedAt', { type: 'DateTime' })
      t.nonNull.field('profile', {
        type: 'UserProfile',
        resolve: async (parent, _args, ctx: Context) => {
          const userProfile = await ctx.getPrisma().userProfile.findUnique({
            where: {
              userId: parent.id,
            },
          })
          if (!userProfile) {
            throw new Error(`User with ID ${parent.id} does not have a profile`)
          }
          return userProfile
        },
      })
    },
  })
  