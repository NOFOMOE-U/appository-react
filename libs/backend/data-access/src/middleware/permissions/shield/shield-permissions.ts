import { and, chain, not, or, rule } from 'graphql-shield'
import { IRuleFieldMap, IRuleTypeMap } from 'graphql-shield/typings/types'
import errorMessages from '../error-messages'
import { isAdmin } from '../rules/is-admin'
import { isAuthenticatedUser } from '../rules/is-authenticated-user'
import { isEditor } from '../rules/is-editor'
import { isOwner } from '../rules/is-owner'
import { isReadingOwnSession } from '../rules/is-reading-own-session'
import { isReadingOwnUser } from '../rules/is-reading-own-user'

const isAuthenticatedFreeLevel = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  const user = await ctx.getUser()

  if(!user) {
    throw new Error(errorMessages.notAuthenticated)
  }

  if(!isFreeLevel(user.accessLevel)) {
    throw new Error(errorMessages.notAuthorized)
  }

  return true
})
const isAuthenticatedAccessLevel = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  const user = await ctx.getUser()
  if (!user) {
    throw new Error(errorMessages.notAuthenticated)
  }

  if (!isPaidLevel(user.accessLevel)) {
    throw new Error(errorMessages.notAuthenticated)
  } else {
    return true
  }
})

//heper functions to check the users tier
const isFreeLevel = (accessLevel: string) => accessLevel === 'free'
const isPaidLevel = (accessLevel: string) => accessLevel === 'standard' || accessLevel === 'premium' || accessLevel === 'enterprise'

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
    users: or(isAuthenticatedUser, isAdmin, and(isEditor, isOwner), isAuthenticatedAccessLevel),
    user: and(isAuthenticatedUser, isReadingOwnUser, isAuthenticatedAccessLevel),
    session: and(isAuthenticatedUser, isReadingOwnSession, isAuthenticatedAccessLevel),
  } as IRuleFieldMap,

  Mutation: {
    signUp: not(isAuthenticatedUser),
    login: not(isAuthenticatedUser),
    logout: not(isAuthenticatedUser),
    createUser: and(isAuthenticatedUser, isOwner, or(isAdmin), isAuthenticatedAccessLevel),
    updateMyProfile: and(isAuthenticatedUser, isOwner, isAuthenticatedAccessLevel),
    deleteUser: or(isAdmin, and(isOwner, isAuthenticatedUser), isAuthenticatedAccessLevel),
    revokeRefreshTokensForUser: and(isAuthenticatedUser, isReadingOwnUser, isAuthenticatedAccessLevel),
  },
  User: {
    secret: and(isOwner, isAuthenticatedFreeLevel),
  },
}

export const isAuthenticatedAdmin = chain(isAuthenticatedUser, isAdmin, isAuthenticatedAccessLevel)
