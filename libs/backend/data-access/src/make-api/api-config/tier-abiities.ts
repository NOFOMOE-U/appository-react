

enum AccessTier {
    FREE = 'free',
    STANDARD = 'standard',
    PREMIUM = 'premium',
    ENTERPRISE = 'enterprise',

}
const tiers = {
    [AccessTier.FREE]: {
      taskManagement: ['createTask', 'assignTask'],
      userProfileSettings: ['updatePersonalInfo', 'updatePreferences'],
      teamCollaboration: ['joinTeam', 'createTeam', 'accessBoard'],
    },
    [AccessTier.STANDARD]: {
      taskManagement: ['createTask', 'assignTask', 'categorizeTask', 'setDeadlines'],
      teamCollaboration: ['sharedCalendars', 'enhancedCommunication'],
      userProfileSettings: ['additionalProfileSettings', 'themeAccess'],
    },
    [AccessTier.PREMIUM]: {
      taskManagement: ['createTask', 'assignTask', 'dependencies', 'recurringTasks', 'advancedAnalytics'],
      teamCollaboration: ['enhancedProjectManagement', 'GanttCharts', 'additionalReporting'],
      userProfileSettings: ['advancedCustomization', 'productivityTracking'],
    },
    [AccessTier.ENTERPRISE]: {
      taskManagement: ['advancedAutomation', 'prioritization', 'delegation'],
      teamCollaboration: ['advancedIntegrations', 'workflowAutomation', 'customizedReporting'],
      userProfileSettings: ['tailoredAnalytics', 'additionalSecurity', 'multiDeviceSync'],
    },
  };
  
function getAbilitiesForTier(tier: AccessTier): string[] {
  const abilities = tiers[tier]

  // Flatten abilities object to string array
  return Object.values(abilities).reduce((acc, ability) => {
    return acc.concat(ability)
  }, [] as string[])
}
  
  // Sample Usage
  const freeTierAbilities = getAbilitiesForTier(AccessTier.FREE);
  console.log('Free Tier Abilities:', freeTierAbilities);