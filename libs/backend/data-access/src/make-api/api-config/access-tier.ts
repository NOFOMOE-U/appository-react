import { UserWithAccessToken } from "../../modules/user/user";
 

export function createUserWithAccessToken(name: string, email: string, accessTier: AccessTier): UserWithAccessToken {
  return {
    id: '2', // Fixed error: Cannot find name 'id'
    name,
    username: 'username', // Fixed error: Cannot find name 'username'
    email,
    accessTier,
    userProfileId: 1,
    accessToken: 'dummy-token',
    passwordHash: undefined,
    resetPasswordToken: undefined,
    roles: [], // Fixed error: Cannot find name 'roles'
    createdAt: Date.now() as unknown as Date, // Fixed error: 'number' only refers to a type
    updatedAt: new Date, // Fixed error related to Date
  }
}



//todo set up prisma type and add to schema
export type AccessTier = {
    FREE: 'free',
    STANDARD: 'standard',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise'
  } 
  
export function isAuthenticated(accessTier: string): boolean {
  switch (accessTier) {
    case 'free':
      // Implement logic for free access
      return true // For demonstration purposes, consider free access as always authenticated
    case 'standard':
      // Implement logic for premium access
      return true // Replace with actual authentication logic
    case 'premium':
      // Implement logic for premium access
      return true // Replace with actual authentication logic
    case 'enterprise':
      // Implement logic for enterprise access
      return true // Replace with actual authentication logic
    default:
      return false // Invalid access tier
  }
}
  


export function mapAccessTierToUserWithAccessToken(accessTier: string): UserWithAccessToken {
  switch (accessTier) {
    case 'free':
      // Mapping for a FREE user
      return {
        id: '2',
        name: 'Sample User',
        username: '',
        email: 'sample@example.com',
        accessTier: AccessTier.FREE,
        userProfileId: 1,
        accessToken: 'dummy-token',
        roles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        passwordHash: undefined,
        resetPasswordToken: undefined,
      } as UserWithAccessToken

    case 'standard':
      // Mapping for a STANDARD user
      return {
        id: '3',
        name: 'Standard User',
        username: 'standarduser',
        email: 'standard@example.com',
        accessTier: AccessTier.STANDARD,
        userProfileId: 1,
        accessToken: 'dummy-token',
        roles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        passwordHash: undefined,
        resetPasswordToken: undefined,
      } as UserWithAccessToken

    case 'premium':
      // Mapping for a PREMIUM user
      return {
        //add the different package offers settings
        id: '4',
        username: 'premiumuser',
        name: 'Premium User',
        email: 'premium@example.com',
        accessTier: AccessTier.PREMIUM,
        userProfileId: 1,
        accessToken: 'dummy-token',
        roles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        // Add premium package specific attributes or settings here
        specialFeatureAccess: true,
        supportPriority: 'high',
        extendedStorage: true,
        passwordHash: undefined,
        resetPasswordToken: undefined,
      } as UserWithAccessToken

    case 'enterprise':
      // Mapping for an ENTERPRISE user
      return {id: '5',
        name: 'Enterprise User',
        username: 'enterpriseuser',
      email: 'enterprise@example.com',
      accessTier: AccessTier.ENTERPRISE,
      userProfileId: 1,
      accessToken: 'dummy-token',
      roles: ['enterprise_user'],
      createdAt: new Date(),
      updatedAt: new Date(),
      // Add enterprise package specific attributes or settings here
      dedicatedSupport: true,
      customIntegration: true,
        unlimitedStorage: true,
        passwordHash: undefined,
        resetPasswordToken: undefined,  } as UserWithAccessToken

    default:
      // For invalid or unhandled cases
      return {} as  UserWithAccessToken 
  }
}
  
  // // // Example usage:
  // // const userAccessTier: AccessTier = AccessTier.PREMIUM;
  // // const isAuthenticatedUser: boolean = isAuthenticated(userAccessTier);
  
  // console.log(`Is the user authenticated? ${isAuthenticatedUser}`);
  