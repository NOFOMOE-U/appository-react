import { errorMessages } from "@appository/shared-features/reports";
import { chain, rule } from "graphql-shield";
import { isAdmin } from "../rules/is-admin";
import { isAuthenticatedUser } from "../rules/is-authenticated-user";

//todo add to admin board- usermanager
// Define configuration for features and their access levels
const featureConfig = {
    freeLevel: ['hello', 'me', 'users', 'user', 'session'],
    accessLevel: [
      'hello',
      'me',
      'users',
      'user',
      'session',
      'signUp',
      'login',
      'logout',
      'createUser',
      'updateMyProfile',
      'deleteUser',
      'revokeRefreshTokensForUser',
    ],
    adminLevel: ['isAuthenticatedAdmin'],
  };
  
  // Create dynamic rules based on the configuration
  const createDynamicRule = (features: string[]) =>
    rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
      const user = await ctx.getUser();
      if (!user) {
        throw new Error(errorMessages.notAuthenticated);
      }
  
      // Check if the user has access to the requested feature
      if (features.includes(info.fieldName)) {
        return true;
      } else {
        throw new Error(errorMessages.notAuthorized);
      }
    });
  
  // Create dynamic rules for each feature
  const dynamicRules = {
    freeLevel: createDynamicRule(featureConfig.freeLevel),
    accessLevel: createDynamicRule(featureConfig.accessLevel),
    adminLevel: createDynamicRule(featureConfig.adminLevel),
  };



export const isAuthenticatedAdmin = chain(
    isAuthenticatedUser,
    isAdmin,
    dynamicRules.adminLevel
  );