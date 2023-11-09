const userBehaviorData = {
  // User interactions with different endpoints

  endpoints: {
    users: {
      getUsers: {
        interactions: [
          // Track interactions related to getUsers endpoint
          { action: 'click', element: 'button', label: 'Get Users' },
          { action: 'scroll', element: 'list', label: 'Scroll Users List' },
          // Add more interactions as needed
        ],
      },
      getUserById: {
        interactions: [
          // Track interactions related to getUserById endpoint
          { action: 'click', element: 'link', label: 'View User Profile' },
          // Add more interactions as needed
        ],
      },
      // Add more endpoints within the users category as needed
    },
    posts: {
      getPosts: {
        interactions: [
          // Track interactions related to getPosts endpoint
          { action: 'click', element: 'button', label: 'View Posts' },
          // Add more interactions as needed
        ],
      },
      // Add more endpoints within the posts category as needed
    },
    tasks: {
      createTask: {
        interactions: [{ action: 'click', element: 'button', label: 'Create New Task' }],
      },
      updateTaskDetails: {
        interactions: [{ action: 'click', element: 'button', label: 'Update Task Details' }],
      },
      changeTaskStatus: {
        interactions: [{ action: 'click', element: 'button', label: 'Change Task Status' }],
      },
      assignTask: {
        interactions: [{ action: 'click', element: 'button', label: 'Assign Task to Team Member' }],
      },
      setTaskPriorities: {
        interactions: [{ action: 'click', element: 'button', label: 'Set Task Priorities' }],
      },
      commentOnTask: {
        interactions: [{ action: 'click', element: 'button', label: 'Comment on Task' }],
      },
      attachFilesToTask: {
        interactions: [{ action: 'click', element: 'button', label: 'Attach Files to Task' }],
      },
      getTasks: {
        interactions: [
          // Track interactions related to getTasks endpoint
          { action: 'click', element: 'button', label: 'View Tasks' },
          // Add more interactions as needed
        ],
      },
      // Add more endpoints within the tasks category as needed
    },
    timeTracking: {
      startTimer: {
        interactions: [{ action: 'click', element: 'button', label: 'Start Timer for Task' }],
      },
      stopTimer: {
        interactions: [{ action: 'click', element: 'button', label: 'Stop Timer for Task' }],
      },
      logTimeManually: {
        interactions: [{ action: 'click', element: 'button', label: 'Log Time Spent Manually' }],
      },
    },
    projectManagement: {
      createProject: {
        interactions: [
          {
            action: 'click',
            element: 'button',
            label: 'Create New Project',
          },
        ],
      },
      updateProjectDetails: {
        interactions: [
          {
            action: 'click',
            element: 'button',
            label: 'Edit Project Details',
          },
        ],
      },
      addTasksToProject: {
        interactions: [
          {
            action: 'click',
            element: 'button',
            label: 'Add Tasks to Project',
          },
        ],
      },
      removeTasksFromProject: {
        interactions: [
          {
            action: 'click',
            element: 'button',
            label: 'Remove Tasks from Project',
          },
        ],
      },
      setProjectDeadlines: {
        interactions: [
          {
            action: 'click',
            element: 'datepicker',
            label: 'Set Project Deadlines',
          },
        ],
      },
      assignUsersToProject: {
        interactions: [
          {
            action: 'click',
            element: 'button',
            label: 'Assign Users to Project',
          },
        ],
      },
    },
    notifications: {
      receiveTaskAssignmentNotifications: {
        interactions: [
          { action: 'notification', type: 'taskAssignment', label: 'Receive Task Assignment Notifications' },
        ],
      },
      receiveProjectDeadlineReminders: {
        interactions: [
          { action: 'notification', type: 'projectDeadline', label: 'Receive Project Deadline Reminders' },
        ],
      },
      clearNotifications: {
        interactions: [{ action: 'click', element: 'button', label: 'Clear Notifications' }],
      },
    },
    dashboard: {
      viewAndCustomizeDashboard: {
        interactions: [{ action: 'visit', page: 'dashboard', label: 'View and Customize Dashboard' }],
      },
      rearrangeWidgets: {
        interactions: [{ action: 'dragAndDrop', element: 'widget', label: 'Rearrange Widgets on Dashboard' }],
      },
    },
    searchAndFilter: {
      searchProjectsTasksUsers: {
        interactions: [{ action: 'search', label: 'Search for Projects, Tasks, or Users' }],
      },
      applyFilters: {
        interactions: [{ action: 'click', element: 'button', label: 'Apply Filters to Tasks or Projects' }],
      },
      // Add more interactions as needed
    },
    reportsAndAnalytics: {
      generateProjectReports: {
        interactions: [{ action: 'generate', element: 'button', label: 'Generate reports on project progress' }],
      },
      analyzeUserProductivity: {
        interactions: [{ action: 'analyze', element: 'button', label: 'Analyze user productivity and performance' }],
      },
    },
    calendarView: {
      accessCalendarView: {
        interactions: [{ action: 'access', element: 'button', label: 'Access the calendar view' }],
      },
      scheduleMilestones: {
        interactions: [{ action: 'schedule', element: 'button', label: 'Schedule project milestones' }],
      },
      viewTasksInCalendar: {
        interactions: [{ action: 'view', element: 'button', label: 'View tasks in a calendar format' }],
      },
    },
    documentManagement: {
      uploadDocuments: {
        interactions: [{ action: 'upload', element: 'input', label: 'Upload project-related documents' }],
      },
      shareDocuments: {
        interactions: [{ action: 'share', element: 'button', label: 'Share project-related documents' }],
      },
      editDocuments: {
        interactions: [{ action: 'edit', element: 'button', label: 'Collaboratively edit documents' }],
      },
    },
    // Database interactions
    database: {
      createRecord: {
        action: 'create',
        element: 'button',
        label: 'Create a new record',
      },
      readRecord: {
        action: 'read',
        element: 'button',
        label: 'Read a record',
      },
      updateRecord: {
        action: 'update',
        element: 'button',
        label: 'Update a record',
      },
      deleteRecord: {
        action: 'delete',
        element: 'button',
        label: 'Delete a record',
      },
    },
    // Object literals for database interactions
    databaseInteractions: {
      createRecord: {
        action: 'create',
        element: 'button',
        label: 'Create a new record',
      },
      readRecord: {
        action: 'read',
        element: 'button',
        label: 'Read a record',
      },
      updateRecord: {
        action: 'update',
        element: 'button',
        label: 'Update a record',
      },
      deleteRecord: {
        action: 'delete',
        element: 'button',
        label: 'Delete a record',
      },
    },

    // Object literals for entity interactions
    entityInteractions: {
      addTaskToProject: {
        action: 'add',
        element: 'button',
        label: 'Add a task to a project',
      },
      inviteTeamMember: {
        action: 'invite',
        element: 'button',
        label: 'Invite a team member',
      },
    },
    // Object literals for data access and permission interactions
    dataAccessPermissionsInteractions: {
      assignUserRole: {
        action: 'assign',
        element: 'button',
        label: 'Assign a role to a user',
      },
      requestAccess: {
        action: 'request',
        element: 'button',
        label: 'Request access to a restricted resource',
      },
      // Add more data access and permission interactions as needed
    },

    // Object literals for custom user actions
    customUserActions: {
      approveProjectBudget: {
        action: 'approve',
        element: 'button',
        label: 'Approve project budget',
      },
      // Add more custom user actions as needed
    },

    // Add more categories and endpoints as needed
  },
  // Additional user behavior data
  otherInteractions: [
    // Track other user interactions not related to specific endpoints
    { action: 'scroll', element: 'page', label: 'Scroll Page' },
    // Add more interactions as needed
  ],
}

// Merge the new interactions into the existing userBehaviorData
userBehaviorData.endpoints.database = userBehaviorData.endpoints.databaseInteractions
userBehaviorData.endpoints.dataAccessPermissionsInteractions = userBehaviorData.endpoints.dataAccessPermissionsInteractions
userBehaviorData.endpoints.customUserActions = userBehaviorData.endpoints.customUserActions


export default userBehaviorData
