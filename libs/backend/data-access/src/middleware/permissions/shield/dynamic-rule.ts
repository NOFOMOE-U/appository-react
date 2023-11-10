import { chain, rule } from "graphql-shield";
import errorMessages from "../error-messages";
import { isAdmin } from "../rules/is-admin";
import { isAuthenticatedUser } from "../rules/is-authenticated-user";

//todo add to admin board- usermanager
// Define configuration for features and their access levels
const featureConfig = {
    freeTier: ['hello', 'me', 'users', 'user', 'session'],
    accessTier: [
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
    adminTier: ['isAuthenticatedAdmin'],
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
    freeTier: createDynamicRule(featureConfig.freeTier),
    accessTier: createDynamicRule(featureConfig.accessTier),
    adminTier: createDynamicRule(featureConfig.adminTier),
  };



export const isAuthenticatedAdmin = chain(
    isAuthenticatedUser,
    isAdmin,
    dynamicRules.adminTier
  );