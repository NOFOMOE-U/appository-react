import { objectType } from "nexus"
import { Context } from "../../context/context"
import { UserWithoutSensitiveData } from "../user/user"

export const UserProfileType = objectType({
    name: 'UserProfile',
    definition(t) {
      t.nonNull.string('bio')
      t.nonNull.string('avatarUrl')
      t.nonNull.string('coverImageUrl')
      t.nonNull.field('createdAt', { type: 'DateTime' })
      t.field('updatedAt', { type: 'DateTime' })
      t.nonNull.field('userProfile', {
        type: 'UserProfile',
        resolve: async (parent: UserWithoutSensitiveData, _args, ctx: Context) => {
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
  



  