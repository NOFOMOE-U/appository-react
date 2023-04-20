import { and, chain, not, or, rule } from 'graphql-shield'
import { IRuleFieldMap, IRuleTypeMap } from 'graphql-shield/typings/types'
import errorMessages from '../error-messages'
import { isAdmin } from '../rules/is-admin'
import { isAuthenticatedUser } from '../rules/is-authenticated-user'
import { isEditor } from '../rules/is-editor'
import { isOwner } from '../rules/is-owner'
import { isReadingOwnSession } from '../rules/is-reading-own-session'
import { isReadingOwnUser } from '../rules/is-reading-own-user'

export const permissions: IRuleTypeMap = {
  Query: {
    //define rules for each query field
    hello: rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
      const user = await ctx.getUser()
      if (!user) {
        throw new Error(errorMessages.notAuthenticated)
      }
      // allow access if user is logged in
      return true
    }),
    me: isAuthenticatedUser,
    users: or(isAuthenticatedUser,isAdmin, and(isEditor, isOwner)),
    user: and(isAuthenticatedUser, isReadingOwnUser),
    session: and(isAuthenticatedUser, isReadingOwnSession)
  } as IRuleFieldMap,
  Mutation: {
    signUp: not(isAuthenticatedUser),
    login: not(isAuthenticatedUser),
    logout: not(isAuthenticatedUser),
    createUser: and(isAuthenticatedUser, isOwner, or(isAdmin)),
    updateMyProfile: and(isAuthenticatedUser, isOwner),
    deleteUser: or(isAdmin, and(isOwner,isAuthenticatedUser)),
    revokeRefreshTokensForUser: and(isAuthenticatedUser, isReadingOwnUser)
  },
  User: {
    secret: isOwner,
  },
}

export const isAuthenticatedAdmin = chain(isAuthenticatedUser, isAdmin)
