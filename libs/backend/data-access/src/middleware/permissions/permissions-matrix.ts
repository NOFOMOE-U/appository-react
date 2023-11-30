export interface PermissionsMatrix {
  [level: string]: {
    [route: string]:
      | {
          [method: string]: boolean
        }
      | boolean
  }
}


export async function checkPermissions(level: string, route: string, method: string): Promise<boolean> {
  const routePermissions = permissionsMatrix[level][route] as { [method: string]: boolean } | true
  if (!routePermissions) {
    return false
  }

  return typeof routePermissions === 'object' ? routePermissions[method] || false : routePermissions
}

export const basePermissions = {
  PROJECT: {
    create: true,
    read: true,
    update: true,
    delete: true,
    invite: true,
    remove: true,
  },
  TASK: {
    create: true,
    read: true,
    update: true,
    delete: true,
    reassign: true,
    updateDueDate: true,
  },
  DOCUMENT: {
    create: true,
    read: true,
    update: true,
    delete: true,
    share: true,
    comment: true,
    download: true,
  },
  Statistics: {
    view: true,
    generateReports: true,
    exportData: true,
    viewTeamStatistics: true,
    viewProjectStatistics: true,
    viewUserPerformance: true,
    customizeReports: true,
    scheduleAutomatedReports: true,
    viewFinancialStatistics: true, // Permission to view financial or budget-related statistics
    viewWebsiteTrafficStatistics: true, // Permission to view website traffic statistics
  },
  Analytics: {
    // Permissions related to analytics and reporting
    customizeReports: true, // Permission to customize and configure reports
    scheduleAutomatedReports: true, // Permission to schedule automated report generation
    accessRealTimeAnalytics: true, // Permission to access real-time analytics
    viewTaskProgressReports: true, // Permission to view task progress reports
    viewErrorLogs: true, // Permission to view error logs and analytics
    viewAuditTrail: true, // Permission to view an audit trail of user actions
    viewCustomerFeedbackReports: true, // Permission to access reports on customer feedback
    viewUserEngagementAnalytics: true, // Permission to view analytics related to user engagement
    viewConversionMetrics: true, // Permission to view conversion metrics (if applicable)
    viewSocialMediaAnalytics: true, // Permission to view analytics related to social media engagement
    viewInventoryAnalytics: true, // Permission to view analytics related to inventory management
    viewSalesPerformanceReports: true, // Permission to view reports on sales performance
    viewCustomerRetentionMetrics: true, // Permission to view metrics related to customer retention
    viewEmployeeProductivityAnalytics: true, // Permission to view analytics on employee productivity
    viewSupplyChainMetrics: true, // Permission to view metrics related to the supply chain
    viewCustomerSupportAnalytics: true, // Permission to view analytics related to customer support
    viewLearningDevelopmentAnalytics: true, // Permission to view analytics related to learning and development
    // Add more statistics-related permissions as needed
  },
  SETTINGS: {
    // Permissions related to app settings
    customize: true,
    manageUsers: true,
    manageRoles: true,
    configureIntegrations: true,
    managePermissions: true, // Permission to manage various user permissions
    viewAuditLogs: true, // Permission to view detailed audit logs
    manageAppThemes: true, // Permission to manage application themes and styles
    configureNotificationSettings: true, // Permission to configure notification preferences
    manageWorkspaceSettings: true, // Permission to configure workspace-specific settings
    manageDataRetention: true, // Permission to manage data retention policies
    manageSecuritySettings: true, // Permission to configure security-related settings
    manageBillingInformation: true, // Permission to manage billing and subscription information
    customizeUserProfiles: true, // Permission to customize user profiles
    configureAuthenticationMethods: true, // Permission to configure authentication methods
    manageFeatureToggles: true, // Permission to manage feature toggles for experimental features
    manageLanguagePreferences: true, // Permission to set language preferences for the application
    configureBackupSettings: true, // Permission to configure backup and restore settings
    manageApplicationAccess: true, // Permission to manage overall application access
    managePrivacySettings: true, // Permission to configure privacy-related settings
    configureUserPreferences: true, // Permission to configure individual user preferences
    manageEmailTemplates: true, // Permission to manage email templates and communication
    manageThirdPartyAPIAccess: true, // Permission to configure access to third-party APIs
    manageSessionSettings: true, // Permission to manage session-related settings
    configureMobileAppSettings: true, // Permission to configure settings specific to the mobile app
    manageDataExportSettings: true, // Permission to manage settings related to data export
    manageLocalizationSettings: true, // Permission to configure localization settings
    // Add more settings-related permissions as needed
  },
  GENERAL_NOTIFICATIONS: {
    // Permissions related to notifications
    configure: true,
    manageSubscriptions: true,

    // Customizable Notifications:
    receiveCustomNotification1: true,
    receiveCustomNotification2: true,

    // General Events:
    receiveSystemAlerts: true, // Receive notifications for system-wide alerts
    receiveApplicationUpdates: true, // Receive notifications for updates to the application
    receivePolicyChanges: true, // Receive notifications for changes in application policies
    receiveNewFeatureAnnouncements: true, // Receive notifications for announcements of new features
    receiveMaintenanceNotifications: true, // Receive notifications for scheduled maintenance

    // User Engagement:
    receiveUserFollowNotifications: true, // Receive notifications when users follow each other
    receiveUserConnectionRequests: true, // Receive notifications for incoming user connection requests
    receiveFriendshipRequestNotifications: true, // Receive notifications for incoming friendship requests

    // User Preferences:
    receiveThemeChangeNotifications: true, // Receive notifications for changes in application themes
    receiveLanguagePreferenceNotifications: true, // Receive notifications for changes in language preferences
  },
  PROJECT_NOTIFICATIONS: {
    receiveProjectInvitationNotifications: true,
    receiveProjectUpdateNotifications: true,
    receiveProjectDeadlineNotifications: true, // Receive notifications about project deadlines
    receiveProjectCommentNotifications: true, // Receive notifications when comments are added to the project
    receiveProjectMilestoneNotifications: true, // Receive notifications about project milestones
    receiveProjectBudgetNotifications: true, // Receive notifications about budget updates in the project
    receiveProjectStatusChangeNotifications: true, // Receive notifications when the project status changes
    receiveProjectPermissionChangeNotifications: true, // Receive notifications about changes in project permissions
    receiveProjectArchivedNotifications: true, // Receive notifications when a project is archived
    receiveProjectActivitySummary: true, // Receive periodic summaries of project activities
    receiveProjectSurveyNotifications: true, // Receive notifications related to project surveys or feedback
    receiveProjectRiskNotifications: true, // Receive notifications about potential project risks
    receiveProjectDocumentUpdateNotifications: true, // Receive notifications when documents in the project are updated
    receiveProjectHealthNotifications: true, // Receive notifications about the overall health/status of the project
    receiveProjectResourceAllocationNotifications: true, // Receive notifications about resource allocation in the project
    receiveProjectApprovalNotifications: true, // Receive notifications for project approvals
    receiveProjectIssueNotifications: true, // Receive notifications about project issues or challenges
    receiveProjectCollaborationRequestNotifications: true, // Receive notifications for collaboration requests in the project
    receiveProjectTaskDependencyNotifications: true, // Receive notifications about task dependencies in the project
  },
  EVENT_NOTIFICATIONS: {
    receiveEventInvitationNotifications: true,
    receiveEventUpdateNotifications: true,
    receiveEventCancellationNotifications: true,
    receiveEventAcceptanceNotifications: true,
    receiveEventDeclineNotifications: true,
    receiveEventAttendanceChangeNotifications: true,
    receiveEventReminders: true,
    receiveEventParticipantJoinNotifications: true,
    receiveEventParticipantLeaveNotifications: true,
    receiveEventParticipantRoleChangeNotifications: true,
    receiveEventLocationChangeNotifications: true,
    receiveEventScheduleChangeNotifications: true,
    receiveEventSpeakerChangeNotifications: true,
    receiveEventAgendaUpdateNotifications: true,
    receiveEventFeedbackRequestNotifications: true,
    receiveEventSurveyRequestNotifications: true,
    receiveEventRecordingAvailabilityNotifications: true,
    receiveEventLiveStreamNotifications: true,
    receiveEventDocumentShareNotifications: true,
    receiveEventPhotoUploadNotifications: true,
    receiveEventTaggingNotifications: true,
    receiveEventRatingNotifications: true,
    receiveEventCommentNotifications: true,
    receiveEventNetworkingRequestNotifications: true,
    receiveEventNetworkingAcceptanceNotifications: true,
    receiveEventNetworkingDeclineNotifications: true,
    receiveEventNetworkingConnectionNotifications: true,
    receiveEventNetworkingMessageNotifications: true,
    receiveEventNetworkingMeetingScheduleNotifications: true,
    receiveEventNetworkingFeedbackNotifications: true,
    receiveEventNetworkingSurveyNotifications: true,
    receiveEventSecurityAlertNotifications: true,
    receiveCustomEventNotification: true,
  },
  COLLABORATION_NOTIFICATIONS: {
    receiveCollaborationRequestNotifications: true,
    receiveCollaborationAcceptanceNotifications: true,
    receiveCollaborationRejectionNotifications: true,
    receiveCollaborationCancellationNotifications: true,
    receiveCollaborationParticipantJoinNotifications: true,
    receiveCollaborationParticipantLeaveNotifications: true,
    receiveCollaborationParticipantRoleChangeNotifications: true,
    receiveCollaborationLocationChangeNotifications: true,
    receiveCollaborationScheduleChangeNotifications: true,
    receiveCollaborationAgendaUpdateNotifications: true,
    receiveCollaborationFeedbackRequestNotifications: true,
    receiveCollaborationSurveyRequestNotifications: true,
    receiveCollaborationRecordingAvailabilityNotifications: true,
    receiveCollaborationLiveStreamNotifications: true,
    receiveCollaborationDocumentShareNotifications: true,
    receiveCollaborationPhotoUploadNotifications: true,
    receiveCollaborationTaggingNotifications: true,
    receiveCollaborationRatingNotifications: true,
    receiveCollaborationCommentNotifications: true,
    receiveCollaborationNetworkingRequestNotifications: true,
    receiveCollaborationNetworkingAcceptanceNotifications: true,
    receiveCollaborationNetworkingDeclineNotifications: true,
    receiveCollaborationNetworkingConnectionNotifications: true,
    receiveCollaborationNetworkingMessageNotifications: true,
    receiveCollaborationNetworkingMeetingScheduleNotifications: true,
    receiveCollaborationNetworkingFeedbackNotifications: true,
    receiveCollaborationNetworkingSurveyNotifications: true,
    receiveCollaborationSecurityAlertNotifications: true,
    receiveCollaborationTaskAssignmentNotifications: true,
    receiveCollaborationTaskCompletionNotifications: true,
    receiveCollaborationTaskCommentNotifications: true,
    receiveCollaborationTaskDeadlineReminders: true,
    receiveCollaborationProjectInvitationNotifications: true,
    receiveCollaborationProjectUpdateNotifications: true,
    receiveCollaborationMilestoneAchievementNotifications: true,
    receiveCollaborationTeamMembershipChangeNotifications: true,
    receiveCollaborationFileUploadNotifications: true,
    receiveCollaborationMeetingScheduleNotifications: true,
    receiveCollaborationSurveyResponseNotifications: true,
    receiveCollaborationTaskPriorityChangeNotifications: true,
    receiveCollaborationTaskDependencyChangeNotifications: true,
  },
  TASK_NOTIFICATIONS: {
    receiveTaskAssignmentNotifications: true,
    receiveTaskCompletionNotifications: true,
    receiveTaskCommentNotifications: true,
    receiveTaskDeadlineReminders: true,
    receiveTaskPriorityChangeNotifications: true,
    receiveTaskDependencyChangeNotifications: true,
    receiveTaskTaggingNotifications: true,
    receiveDocumentEditNotifications: true,
    receiveDocumentShareNotifications: true,
    receiveDocumentCommentNotifications: true,
    receiveDocumentDownloadNotifications: true,
    receiveDocumentVersionControlNotifications: true,
    receiveUserRoleChangeNotifications: true,
    receiveTeamRoleChangeNotifications: true,
    receiveTaskReassignmentNotifications: true,
    receiveTaskDueDateChangeNotifications: true,
    receiveTaskProgressUpdateNotifications: true,
    receiveTaskArchivingNotifications: true,
    receiveTaskRestorationNotifications: true,
    receiveTaskAnalyticsNotifications: true,
    receiveTaskReviewProcessNotifications: true,
    receiveTaskTemplateConfigurationNotifications: true,
    receiveTaskAccessManagementNotifications: true,
    receiveTaskReportGenerationNotifications: true,
    receiveTaskMilestoneCreationNotifications: true,
    receiveTaskMeetingScheduleNotifications: true,
    receiveTaskSurveyInitiationNotifications: true,
    receiveTaskBrainstormingInitiationNotifications: true,
    receiveTaskKnowledgebaseCreationNotifications: true,
    receiveAutomatedTaskTestingNotifications: true,
    receiveTaskServiceManagementNotifications: true,
    receiveTaskResourceAllocationNotifications: true,
  },
  DOCUMENT_NOTIFICATIONS: {
    receiveMeetingCancellationNotifications: true,
    receiveTaskTagRemovalNotifications: true,
    receiveTaskDependencyRemovalNotifications: true,
    receiveDocumentUnshareNotifications: true,
    receiveDocumentEditConflictNotifications: true,
    receiveDocumentMoveNotifications: true,
    receiveDocumentCopyNotifications: true,
    receiveDocumentArchiveNotifications: true,
    receiveDocumentRestoreNotifications: true,
    receiveDocumentRenameNotifications: true,
    receiveDocumentOwnershipChangeNotifications: true,
    receiveDocumentSettingsChangeNotifications: true,
    receiveDocumentHistoryViewNotifications: true,
    receiveDocumentCollaborationNotifications: true,
    receiveDocumentExportNotifications: true,
    receiveDocumentImportNotifications: true,
    receiveDocumentPublishNotifications: true,
    receiveDocumentManageAccessNotifications: true,
    receiveDocumentSetRemindersNotifications: true,
    receiveDocumentAddAttachmentNotifications: true,
    receiveDocumentCustomizeAppearanceNotifications: true,
    receiveDocumentSetPermissionsNotifications: true,
    receiveDocumentCreateSubdocumentNotifications: true,
    receiveDocumentOrganizeFoldersNotifications: true,
    receiveDocumentSetExpirationNotifications: true,
    receiveDocumentReviewCommentsNotifications: true,
    receiveDocumentManageWorkflowNotifications: true,
    receiveDocumentInitiateApprovalProcessNotifications: true,
    receiveDocumentConfigureTemplatesNotifications: true,
    receiveDocumentCompareVersionsNotifications: true,
    receiveDocumentAuditTrailNotifications: true,
    receiveDocumentGenerateReportsNotifications: true,
    receiveDocumentAccessAnalyticsNotifications: true,
    receiveDocumentManageTasksNotifications: true,
    receiveDocumentAssignTagsNotifications: true,
    receiveDocumentCollaborateExternallyNotifications: true,
  },
  TEAM_NOTIFICATIONS: {
    receiveMilestoneAchievementNotifications: true,
    receiveTeamMembershipChangeNotifications: true,
    receiveFileUploadNotifications: true,
    receiveMeetingScheduleNotifications: true,
    receiveSurveyResponseNotifications: true,
    receiveTeamTaskCompletionNotifications: true, // Receive notifications when team tasks are completed
    receiveTeamFeedbackNotifications: true, // Receive notifications for team feedback or reviews
    receiveTeamEventNotifications: true, // Receive notifications about upcoming team events
    receiveTeamAnnouncementNotifications: true, // Receive notifications for important team announcements
    receiveTeamResourceAllocationNotifications: true, // Receive notifications about resource allocation within the team
    receiveTeamBudgetNotifications: true, // Receive notifications about budget updates within the team
    receiveTeamStatusChangeNotifications: true, // Receive notifications when the team status changes
    receiveTeamIssueNotifications: true, // Receive notifications about team-related issues or challenges
    receiveTeamTaskAssignmentNotifications: true, // Receive notifications when tasks are assigned to team members
    receiveTeamTaskDependencyNotifications: true, // Receive notifications about task dependencies within the team
    receiveTeamHealthNotifications: true, // Receive notifications about the overall health/status of the team
    receiveTeamCollaborationRequestNotifications: true, // Receive notifications for collaboration requests within the team
    receiveTeamApprovalNotifications: true, // Receive notifications for team approvals
    receiveTeamPermissionChangeNotifications: true, // Receive notifications about changes in team permissions
    receiveTeamSurveyNotifications: true, // Receive notifications related to team surveys or feedback
    receiveTeamDocumentUpdateNotifications: true, // Receive notifications when documents within the team are updated
    receiveTeamTaskReviewNotifications: true, // Receive notifications for task reviews or evaluations within the team
    receiveTeamIssueResolutionNotifications: true, // Receive notifications when team-related issues are resolved
    receiveTeamMeetingReminderNotifications: true, // Recei
  },

  COMMUNICATIONS_NOTIFICATIONS: {
    receiveMessageNotifications: true,
    receiveAudioCallNotifications: true,
    receiveVideoCallNotifications: true,
    receiveCollaborationRequestApprovedNotifications: true,
    receiveCollaborationRequestDeniedNotifications: true,
    receiveCollaborationInvitationNotifications: true,
    receiveCollaborationInvitationAcceptedNotifications: true,
    receiveCollaborationInvitationDeclinedNotifications: true,
    receiveCollaborationExitNotifications: true,
    receiveCollaborationRemovalNotifications: true,
    receiveCollaborationUpdateNotifications: true,
    receiveCollaborationMemberStatusChangeNotifications: true,
    receiveCollaborationAdminChangeNotifications: true,
    receiveCollaborationMemberJoinNotifications: true,
    receiveCollaborationMemberLeaveNotifications: true,
    receiveCollaborationMemberRoleChangeNotifications: true,
    receiveCollaborationMemberPermissionChangeNotifications: true,
    receiveCollaborationMemberActivityNotifications: true,
    receiveCollaborationContentAddedNotifications: true,
    receiveCollaborationContentRemovedNotifications: true,
    receiveCollaborationContentUpdateNotifications: true,
    receiveCollaborationContentCommentNotifications: true,
    receiveCollaborationContentTaggingNotifications: true,
    receiveCollaborationContentTaskAssignmentNotifications: true,
    receiveCollaborationContentTaskCompletionNotifications: true,
    receiveCollaborationContentTaskCommentNotifications: true,
    receiveCollaborationContentTaskDeadlineReminders: true,
    receiveCollaborationContentFileUploadNotifications: true,
    receiveCollaborationContentMeetingScheduleNotifications: true,
    receiveCollaborationContentSurveyResponseNotifications: true,
    receiveCollaborationContentFeedbackSubmissionNotifications: true,
    receiveCollaborationContentSecurityAlertNotifications: true,
    receiveCustomCollaborationNotification: true,
  },
  COMMUNICATION: {
    // Permissions related to communication features
    initiateVideoCall: true,
    sendTextMessage: true,
    initiateAudioCall: true,
    sendAudioMessage: true,
    sendMultimediaMessage: true,
    joinGroupChat: true, // Permission to join group chats
    createGroupChat: true, // Permission to create new group chats
    leaveGroupChat: true, // Permission to leave group chats
    muteNotifications: true, // Permission to mute notifications for a conversation
    pinMessage: true, // Permission to pin important messages in a chat
    deleteMessage: true, // Permission to delete messages in a chat
    editMessage: true, // Permission to edit messages in a chat
    forwardMessage: true, // Permission to forward messages to others
    shareLocation: true, // Permission to share current location in a conversation
    sendFiles: true, // Permission to send files/documents in a conversation
    viewReadReceipts: true, // Permission to view read receipts of messages
    viewTypingIndicator: true, // Permission to view typing indicators in a chat
    manageParticipants: true, // Permission to manage participants in a group chat
    setStatus: true, // Permission to set a status message in the communication app
    scheduleMessage: true, // Permission to schedule a message for later delivery
    reactToMessage: true, // Permission to add reactions to messages
    replyToMessage: true, // Permission to reply to specific messages in a chat
    viewCallHistory: true, // Permission to view call history
    blockUser: true, // Permission to block a user in the communication app
    reportAbuse: true, // Permission to report abusive content or behavior
    customizeThemes: true, // Permission to customize chat themes and appearance
    setAvailability: true, // Permission to set availability status (e.g., online, offline)
    manageNotifications: true, // Permission to manage communication notifications
    viewMessageStatistics: true, // Permission to view statistics related to messages
    // Add more communication-specific permissions as needed
  },
  SECURITY_NOTIFICATIONS: {
    receiveSecurityAlertNotifications: true,
    receiveLoginAttemptNotifications: true, // Receive notifications for failed login attempts
    receivePasswordChangeNotifications: true, // Receive notifications for password changes
    receiveTwoFactorAuthenticationNotifications: true, // Receive notifications for two-factor authentication events
    receiveDeviceLoginNotifications: true, // Receive notifications for new device logins
    receiveSuspiciousActivityNotifications: true, // Receive notifications for suspicious activity
    receiveAccountLockoutNotifications: true, // Receive notifications for account lockouts
    receivePasswordExpiryNotifications: true, // Receive notifications for password expiry reminders
    receiveSecurityPolicyViolations: true, // Receive notifications for security policy violations
    receivePrivacySettingsChangeNotifications: true, // Receive notifications for changes in privacy settings
    receiveDataBreachNotifications: true, // Receive notifications for potential data breaches
    receiveAccessControlNotifications: true, // Receive notifications for changes in access control settings
    receiveRolePermissionChangeNotifications: true, // Receive notifications for changes in role permissions
    receiveSecurityPatchNotifications: true, // Receive notifications for security patch updates
    receiveVulnerabilityAlerts: true, // Receive notifications for identified vulnerabilities
    receiveEncryptionStatusChangeNotifications: true, // Receive notifications for changes in encryption status
    receiveThirdPartyAPIAccessNotifications: true, // Receive notifications for third-party API access
    receiveSessionTimeoutNotifications: true, // Receive notifications for session timeouts
    receiveFirewallRuleChangeNotifications: true, // Receive notifications for changes in firewall rules
    receiveAntivirusScanResultsNotifications: true, // Receive notifications for antivirus scan results
    receiveCertificateExpiryNotifications: true, // Receive notifications for certificate expiry
    receiveNetworkIntrusionDetectionNotifications: true, // Receive notifications for network intrusion detection alerts
    receiveSecurityTrainingReminders: true, // Receive notifications for upcoming security training sessions
    receivePhysicalSecurityNotifications: true, // Receive notifications for physical security breaches
    receiveIncidentResponseNotifications: true, // Receive notifications for incident response activities
    receiveComplianceViolationNotifications: true, // Receive notifications for compliance policy violations
    receiveBiometricAuthenticationNotifications: true, // Receive notifications for biometric authentication events
    receiveSecurityAuditTrailNotifications: true, // Receive notifications for security audit trail events
    receiveSecureConnectionEstablishmentNotifications: true, // Receive notifications for secure connection establishments
    receiveSecureFileTransferNotifications: true, // Receive notifications for secure file transfers
    // Add more security-related notifications as needed    receiveSecurityAlertNotifications: true,
  },

  SURVEY_FEEDBACK_NOTIFICATIONS: {
    receiveSurveyCompletionNotifications: true,
    receiveFeedbackSubmissionNotifications: true,

    // Survey and Feedback Reminders:
    receiveSurveyReminderNotifications: true, // Receive notifications for pending survey completions
    receiveFeedbackReminderNotifications: true, // Receive notifications for pending feedback submissions

    // Survey and Feedback Analytics:
    receiveSurveyResponseAnalytics: true, // Receive notifications for survey response analytics
    receiveFeedbackAnalysisNotifications: true, // Receive notifications for feedback analysis results

    // Survey and Feedback Trends:
    receiveSurveyTrendNotifications: true, // Receive notifications for survey completion trends
    receiveFeedbackTrendNotifications: true, // Receive notifications for feedback submission trends

    // Survey and Feedback Collaboration:
    receiveSurveyCollaborationNotifications: true, // Receive notifications for collaborative survey creation
    receiveFeedbackCollaborationNotifications: true, // Receive notifications for collaborative feedback collection

    // Survey and Feedback Customization:
    receiveSurveyCustomizationNotifications: true, // Receive notifications for changes in survey customization
    receiveFeedbackCustomizationNotifications: true, // Receive notifications for changes in feedback form customization

    // Survey and Feedback Rewards:
    receiveSurveyRewardNotifications: true, // Receive notifications for survey completion rewards
    receiveFeedbackRewardNotifications: true, // Receive notifications for feedback submission rewards

    // Survey and Feedback Gamification:
    receiveSurveyGamificationNotifications: true, // Receive notifications for gamified survey elements
    receiveFeedbackGamificationNotifications: true, // Receive notifications for gamified feedback elements

    // Survey and Feedback Reports:
    receiveSurveyReportNotifications: true, // Receive notifications for new survey reports
    receiveFeedbackReportNotifications: true, // Receive notifications for new feedback reports

    // Survey and Feedback Integration:
    receiveSurveyIntegrationNotifications: true, // Receive notifications for survey integration updates
    receiveFeedbackIntegrationNotifications: true, // Receive notifications for feedback integration updates

    // Survey and Feedback User Engagement:
    receiveSurveyEngagementNotifications: true, // Receive notifications for increased survey engagement
    receiveFeedbackEngagementNotifications: true, // Receive notifications for increased feedback engagement

    // Survey and Feedback User Recognition:
    receiveSurveyRecognitionNotifications: true, // Receive notifications for user recognition in surveys
    receiveFeedbackRecognitionNotifications: true, // Receive notifications for user recognition in feedback

    // Survey and Feedback Accessibility:
    receiveSurveyAccessibilityNotifications: true, // Receive notifications for improvements in survey accessibility
    receiveFeedbackAccessibilityNotifications: true, // Receive notifications for improvements in feedback accessibility

    // Add more survey and feedback-related notifications as needed
  },
  INTEGRATION_NOTIFICATIONS: {
    receiveIntegrationErrorNotifications: true,
    receiveIntegrationSuccessNotifications: true,

    // Integration Connection:
    receiveIntegrationConnectionNotifications: true, // Receive notifications for successful connection to integrations
    receiveIntegrationDisconnectionNotifications: true, // Receive notifications for disconnection from integrations

    // Integration Data Sync:
    receiveIntegrationDataSyncStartNotifications: true, // Receive notifications for the start of data synchronization
    receiveIntegrationDataSyncCompleteNotifications: true, // Receive notifications for the completion of data synchronization
    receiveIntegrationDataSyncFailureNotifications: true, // Receive notifications for data synchronization failures

    // Integration API Changes:
    receiveIntegrationAPIUpdateNotifications: true, // Receive notifications for updates to integration APIs
    receiveIntegrationAPIDeprecationNotifications: true, // Receive notifications for deprecated integration APIs

    // Integration Configuration:
    receiveIntegrationConfigurationChangeNotifications: true, // Receive notifications for changes in integration configurations
    receiveIntegrationConfigurationErrorNotifications: true, // Receive notifications for errors in integration configurations

    // Integration Authorization:
    receiveIntegrationAuthorizationNotifications: true, // Receive notifications for successful integration authorizations
    receiveIntegrationAuthorizationFailureNotifications: true, // Receive notifications for failed integration authorizations

    // Integration Rate Limits:
    receiveIntegrationRateLimitExceededNotifications: true, // Receive notifications for exceeding integration rate limits

    // Integration Health:
    receiveIntegrationHealthNotifications: true, // Receive notifications for the overall health of integrations
    receiveIntegrationPerformanceNotifications: true, // Receive notifications for changes in integration performance

    // Integration Version Updates:
    receiveIntegrationVersionUpdateNotifications: true, // Receive notifications for updates to integration versions
    receiveIntegrationVersionDeprecationNotifications: true, // Receive notifications for deprecated integration versions

    // Integration Collaboration:
    receiveIntegrationCollaborationRequestNotifications: true, // Receive notifications for collaboration requests related to integrations

    // Integration Security:
    receiveIntegrationSecurityNotifications: true, // Receive notifications for security updates related to integrations
    receiveIntegrationSecurityVulnerabilityNotifications: true, // Receive notifications for identified security vulnerabilities in integrations

    // Integration Documentation:
    receiveIntegrationDocumentationUpdateNotifications: true, // Receive notifications for updates to integration documentation
    receiveIntegrationDocumentationErrorNotifications: true, // Receive notifications for errors in integration documentation

    // Integration Usage:
    receiveIntegrationUsageAnalyticsNotifications: true, // Receive notifications for analytics related to integration usage
    // Add more integration-related notifications as needed
  },
}

export const permissionsMatrix: PermissionsMatrix = {
  ADMIN: {
    ...basePermissions,
    PROJECT: {
      create: true,

      bugTracking: true,
    },
    TASK: {
      reassign: true,
      updateDueDate: true,
    },
    USER: {
      read: true,
      update: true,
      delete: true,
    },
    TEAM: {
      read: true,
      update: true,
      delete: true,
    },
  },
  MODERATOR: {
    ...basePermissions,
    PROJECT: {
      create: false,
      read: true,
      update: false,
      delete: false,
      invite: true,
      remove: true,
    },
    TASK: {
      create: false,
      read: true,
      update: false,
      delete: false,
      reassign: true,
      updateDueDate: true,
    },
  },
  USER: {
    ...basePermissions,
    PROJECT: {
      viewDetails: true,
      manageMembers: true,
      createTasks: true,
      assignTasks: true,
      trackProgress: true,
      setDueDates: true,
      prioritizeTasks: true,
      addAttachments: true,
      createSubprojects: true,
      customizeSettings: true,
      setBudget: true,
      viewAnalytics: true,
      initiateReviewProcess: true,
      configureTemplates: true,
      manageAccess: true,
      generateReports: true,
      createMilestones: true,
      scheduleMeetings: true,
      conductSurveys: true,
      archive: true,
      restore: true,
      facilitateBrainstormingSessions: true,
      createKnowledgeBase: true,
      implementAutomatedTesting: true,
      manageServiceIntegrations: true,
      viewResourceAllocation: true,
      customizeWorkflows: true,
      
      assignProjectRoles: true,
      manageWorkspaces: true,
      initiateIdeationProcess: true,
      coordinateCrossFunctionalTeams: true,
      monitorProjectHealth: true,
      viewGanttCharts: true,
      manageDependencies: true,
      collaborateExternally: true,
      integrateWithExternalTools: true,
      initiateBugTracking: true,
      manageVersions: true,
      conductTrainingSessions: true,
      configureDashboards: true,
      analyzeProjectRisks: true,
      establishProjectPolicies: true,
      enforceSecurityMeasures: true,
      reviewContractual: true,
      facilitateClientMeetingsAgreements: true,
      manageThirdPartyIntegrations: true,
      monitorProjectCosts: true,
      resolveProjectConflicts: true,
      initiateProjectRetrospectives: true,
    },
    TASK: {
      reassign: true,
      updateDueDate: true,
      completeTask: true,
      createSubtasks: true,
      viewTaskDetails: true,
      prioritizeTasks: true,
      addAttachments: true,
      commentOnTask: true,
      mentionTeammates: true,
      markTaskAsUrgent: true,
      setTaskDependencies: true,
      assignTagsToTask: true,
      viewTaskProgress: true,
      viewTaskHistory: true,
      duplicateTask: true,
      moveTaskToAnotherProject: true,
      archiveTask: true,
      restoreArchivedTask: true,
      viewTaskAnalytics: true,
      initiateTaskReviewProcess: true,
      configureTaskTemplates: true,
      manageTaskAccess: true,
      generateTaskReports: true,
      createTaskMilestones: true,
      scheduleTaskMeetings: true,
      conductTaskSurveys: true,
      initiateTaskBrainstorming: true,
      createTaskKnowledgebase: true,
      implementAutomatedTaskTesting: true,
      manageTaskService: true,
      viewTaskResourceAllocation: true,
      customizeTaskWorkflows: true,
      assignTaskToProject: true,
      manageTaskWorkspaces: true,
      initiateTaskIdeation: true,
      coordinateTaskCrossFunctionalTeams: true,
      monitorTaskProgress: true,
      viewTaskGanttChart: true,
      manageTaskDependencies: true,
      collaborateExternallyOnTask: true,
      integrateTaskWithExternalTools: true,
      initiateTaskBugTracking: true,
      manageTaskVersions: true,
    },
    DOCUMENT: {
      share: true, // Allowing users to share the document with others
      comment: true, // Allowing users to add comments to the document
      download: true, // Allowing users to download the document
      editPermissions: true, // Allowing users to edit document permissions (e.g., share with specific users)
      versionControl: true, // Allowing users to manage document versions
      move: true, // Allowing users to move the document to a different location
      copy: true, // Allowing users to make a copy of the document
      print: true,
      editContent: true,
      trackChanges: true,
      rename: true,
      changeOwnership: true,
      archive: true, // Allowing users to archive the document
      restore: true,
      customizeDocumentSettings: true,
      viewHistory: true,
      collaborate: true,
      export: true,
      import: true,
      publish: true,
      manageAccess: true,
      setReminders: true,
      addAttachments: true,
      customizeAppearance: true,
      setPermissions: true,
      createSubdocument: true,
      organizeFolders: true,
      setExpiration: true,
      reviewComments: true,
      manageWorkflow: true,
      initiateApprovalProcess: true,
      configureTemplates: true,
      compareVersions: true,
      auditTrail: true,
      generateReports: true,
      // Add more document-specific permissions as needed
      accessAnalytics: true,
      manageTasks: true,
      assignTags: true,
      collaborateExternally: true,
    },
  },
}
