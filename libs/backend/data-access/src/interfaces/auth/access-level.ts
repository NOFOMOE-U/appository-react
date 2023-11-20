import { UserWithAccessToken, UserWithoutSensitiveData } from '../../modules/user/user'

export function createUserWithAccessToken(name: string, email: string, accessLevel: AccessLevel): UserWithAccessToken {
  return {
    name,
    email,
    accessLevel,
    id: '',
    accessToken: '',
    userId: '',
  } as UserWithAccessToken
}

//todo set up prisma type and add to schema
export type AccessLevel = {
  FREE: 'free'
  STANDARD: 'standard'
  PREMIUM: 'premium'
  ENTERPRISE: 'enterprise'
}

export function isAuthenticated(accessLevel: string): boolean {
  switch (accessLevel) {
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

export function mapAccessLevelToUserWithAccessToken(accessLevel: string): UserWithAccessToken {
  switch (accessLevel) {
    case 'free':
      // Mapping for a FREE user
      //todo accessLevel
      return {
        id: '2',
        name: 'Sample User',
        username: '',
        email: 'sample@example.com',
        accessLevel: 'FREE',
        userProfileId: 1,
        accessToken: 'dummy-token',
        roles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        passwordHash: undefined,
        resetPasswordToken: undefined,
        groupId:0,
        confirmPassword: null,
        confirmPasswordMatch: null,
      } as UserWithoutSensitiveData

    case 'standard':
      // Mapping for a STANDARD user
      return {
        id: '3',
        name: 'Standard User',
        username: 'standarduser',
        email: 'standard@example.com',
        accessLevel: 'STANDARD',
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
        accessLevel: 'PREMIUM',
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
      return {
        id: '5',
        name: 'Enterprise User',
        username: 'enterpriseuser',
        email: 'enterprise@example.com',
        accessLevel: 'ENTERPRISE',
        userProfileId: 1,
        accessToken: 'dummy-token',
        roles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        // Add enterprise package specific attributes or settings here
        dedicatedSupport: true,
        customIntegration: true,
        unlimitedStorage: true,
        passwordHash: undefined,
        resetPasswordToken: undefined,
      } as UserWithAccessToken

    default:
      // For invalid or unhandled cases
      return {} as UserWithAccessToken
  }
}


//todo set up prisma type and add to schema
//done
// FREE Level:

// Basic task management: Create tasks, assign them to oneself or a team.
// Access to user profile settings: Update personal information, preferences, and basic settings.
// Limited team collaboration: Join or create teams, limited number of tasks, access to a shared board.
// STANDARD Level:

// Expanded task management: Enhanced task tracking, ability to categorize tasks, and set deadlines.
// Advanced team collaboration: More team-related functionalities, shared team calendars, enhanced communication features.
// User profile customization: Access to additional profile settings and themes.
// PREMIUM Level:

// Advanced task management: Task dependencies, recurring tasks, and advanced analytics on task completion.
// Team collaboration: Enhanced project management features, Gantt charts, and additional reporting.
// Extensive user profile settings: Advanced customization options for personalization and productivity tracking.
// ENTERPRISE Level:

// Comprehensive task management: Advanced automation, prioritization, and delegation features.
// Team collaboration and integration: Advanced integrations with enterprise tools, workflow automation, and customized reporting.
// Detailed user profile settings: Tailored analytics, additional security settings, and multi-device syncing.












