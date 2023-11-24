enum AccessLevel {
  FREE = 'free',
  STANDARD = 'standard',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
}
const levels = {
  [AccessLevel.FREE]: {
    taskManagement: ['createTask', 'assignTask'],
    userProfileSettings: ['updatePersonalInfo', 'updatePreferences'],
    teamCollaboration: ['joinTeam', 'createTeam', 'accessBoard'],
    // Add features for video conferencing and document collaboration
    videoConferencing: ['basicVideoCalls', 'screenSharing'],
    documentCollaboration: ['basicDocumentCreation', 'realTimeCursorTracking'],
    // Add more features as needed
  },
  [AccessLevel.STANDARD]: {
    taskManagement: ['createTask', 'assignTask', 'categorizeTask', 'setDeadlines'],
    teamCollaboration: ['sharedCalendars', 'enhancedCommunication'],
    userProfileSettings: ['additionalProfileSettings', 'themeAccess'],
    // Add features for video conferencing and document collaboration
    videoConferencing: ['scheduledMeetings', 'participantManagement'],
    documentCollaboration: ['documentThemes', 'customizableThemes'],
    // Add more features as needed
  },
  [AccessLevel.PREMIUM]: {
    taskManagement: ['createTask', 'assignTask', 'dependencies', 'recurringTasks', 'advancedAnalytics'],
    teamCollaboration: ['enhancedProjectManagement', 'GanttCharts', 'additionalReporting'],
    userProfileSettings: ['advancedCustomization', 'productivityTracking'],
    // Add features for video conferencing and document collaboration
    videoConferencing: ['largeMeetings', 'advancedParticipantControls'],
    documentCollaboration: ['whiteboardFeature', 'advancedStickyNotes'],
    // Add more features as needed
  },
  [AccessLevel.ENTERPRISE]: {
    taskManagement: ['advancedAutomation', 'prioritization', 'delegation'],
    teamCollaboration: ['advancedIntegrations', 'workflowAutomation', 'customizedReporting'],
    userProfileSettings: ['tailoredAnalytics', 'additionalSecurity', 'multiDeviceSync'],
    // Add features for video conferencing and document collaboration
    videoConferencing: ['enterpriseAnalyticsDashboard', 'customBranding'],
    documentCollaboration: ['advancedOutlines', 'advancedDatabaseDiagrams'],
    // Add more features as needed
  },
}

function getAbilitiesForLevel(tier: AccessLevel): string[] {
  const abilities = levels[tier]

  // Flatten abilities object to string array
  return Object.values(abilities).reduce((acc, ability) => {
    return acc.concat(ability)
  }, [] as string[])
}

// Sample Usage
const freeLevelAbilities = getAbilitiesForLevel(AccessLevel.FREE)
console.log('Free Level Abilities:', freeLevelAbilities)
