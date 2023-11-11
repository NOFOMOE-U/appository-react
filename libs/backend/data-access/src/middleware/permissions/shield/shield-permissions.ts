import { and, chain, not, or, rule } from 'graphql-shield'
import { IRuleFieldMap, IRuleTypeMap } from 'graphql-shield/typings/types'
import errorMessages from '../error-messages'
import { isAdmin } from '../rules/is-admin'
import { isAuthenticatedUser } from '../rules/is-authenticated-user'
import { isEditor } from '../rules/is-editor'
import { isOwner } from '../rules/is-owner'
import { isReadingOwnSession } from '../rules/is-reading-own-session'
import { isReadingOwnUser } from '../rules/is-reading-own-user'

const isAuthenticatedFreeTier = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  const user = await ctx.getUser()

  if(!user) {
    throw new Error(errorMessages.notAuthenticated)
  }

  if(!isFreeTier(user.accessTier)) {
    throw new Error(errorMessages.notAuthorized)
  }

  return true
})
const isAuthenticatedAccessTier = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  const user = await ctx.getUser()
  if (!user) {
    throw new Error(errorMessages.notAuthenticated)
  }

  if (!isPaidTier(user.accessTier)) {
    throw new Error(errorMessages.notAuthenticated)
  } else {
    return true
  }
})

//heper functions to check the users tier
const isFreeTier = (accessTier: string) => accessTier === 'free'
const isPaidTier = (accessTier: string) => accessTier === 'standard' || accessTier === 'premium' || accessTier === 'enterprise'

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
    users: or(isAuthenticatedUser, isAdmin, and(isEditor, isOwner), isAuthenticatedAccessTier),
    user: and(isAuthenticatedUser, isReadingOwnUser, isAuthenticatedAccessTier),
    session: and(isAuthenticatedUser, isReadingOwnSession, isAuthenticatedAccessTier),
  } as IRuleFieldMap,

  Mutation: {
    signUp: not(isAuthenticatedUser),
    login: not(isAuthenticatedUser),
    logout: not(isAuthenticatedUser),
    createUser: and(isAuthenticatedUser, isOwner, or(isAdmin), isAuthenticatedAccessTier),
    updateMyProfile: and(isAuthenticatedUser, isOwner, isAuthenticatedAccessTier),
    deleteUser: or(isAdmin, and(isOwner, isAuthenticatedUser), isAuthenticatedAccessTier),
    revokeRefreshTokensForUser: and(isAuthenticatedUser, isReadingOwnUser, isAuthenticatedAccessTier),
  },
  User: {
    secret: and(isOwner, isAuthenticatedFreeTier),
  },
}

export const isAuthenticatedAdmin = chain(isAuthenticatedUser, isAdmin, isAuthenticatedAccessTier)
