import { UserWithAccessToken } from "../../modules/user/user";

//todo set up prisma type and add to schema
export enum AccessTier {
    FREE = 'free',
    STANDARD = 'standard',
    PREMIUM = 'premium',
    ENTERPRISE = 'enterprise',
  }
  
export  function isAuthenticated(accessTier: AccessTier): boolean {
    switch (accessTier) {
      case AccessTier.FREE:
        // Implement logic for free access
        return true; // For demonstration purposes, consider free access as always authenticated
      case AccessTier.STANDARD:
        // Implement logic for standard access
        return true; // Replace with actual authentication logic
      case AccessTier.PREMIUM:
        // Implement logic for premium access
        return true; // Replace with actual authentication logic
      case AccessTier.ENTERPRISE:
        // Implement logic for enterprise access
        return true; // Replace with actual authentication logic
      default:
        return false; // Invalid access tier
    }
  
  
  }
  

export function mapAccessTierToUserWithAccessToken(accessTier: AccessTier): UserWithAccessToken{
    
  switch (accessTier) {
      case accessTier.FREE

      break
    }

  return new UserWithAccessToken
  }
  
  // // // Example usage:
  // // const userAccessTier: AccessTier = AccessTier.PREMIUM;
  // // const isAuthenticatedUser: boolean = isAuthenticated(userAccessTier);
  
  // console.log(`Is the user authenticated? ${isAuthenticatedUser}`);
  