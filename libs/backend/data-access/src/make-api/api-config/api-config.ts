import { generateUrl } from "../generate-endpint";
// #todo 
// 1. can these be added in a function to be use, would that be beneficial.
//todo 
// 2. convert items below to be more dynamic as above
// 3. how do I dynamically call the defined Urls based on user, permission and roles I already have set up:
// 4. What is thhe best way to separate these items into their own folders to make the files smaller 
// and keep use one endpoint/function to feed them through

// #review #examples:
// // Generate a search endpoint
// const getUserByIdUrl: generateUrl('users/{userId}', '123'),



// #review 
// Example URL: https://api.example.com/notifications
// Update a notification:

// HTTP method: PUT or PATCH
// Example URL: https://api.example.com/notifications/123
// Delete a notification:

// HTTP method: DELETE
// Example URL: https://api.example.com/notifications/123
// Search notifications:

// HTTP method: GET
// Example URL: https://api.example.com/search?q=search_term (replace search_term with the actual search term)


// // Generate a create endpoint
// const createUserUrl: generateUrl('users/{userId}', '123', '', EndpointType.CREATE),
// // Generate a search endpoint
const INTERNAL_API_CONFIG = {
    
    getUsersUrl: generateUrl('users'),
    getUserByIdUrl: generateUrl('users/{userId}', '123'),
    updateUserUrl: generateUrl('users/{userId}'),
    deleteUserUrl: generateUrl('users/{userId}'),
    getUserPostsUrl: generateUrl('users/{userId}/posts'),
    getUserTasksUrl: generateUrl('users/{userId}/tasks'),
    searchUsersUrl: generateUrl('users/search'),

    getPostsUrl: generateUrl('posts'),
    getPostByIdUrl: generateUrl('posts/{postId}'),
    createPostUrl: generateUrl('posts'),
    updatePostUrl: generateUrl('posts/{postId}'),
    deletePostUrl: generateUrl('posts/{postId}'),
    getPostCommentsUrl: generateUrl('posts/{postId}/comments'),
    getPostLikesUrl: generateUrl('posts/{postId}/likes'),

    getTaskUrl: generateUrl('tasks/:taskId'),
    getTasksUrl: generateUrl('tasks'),
    getTaskByIdUrl: generateUrl('tasks/{taskId}'),
    getTasksByProjectUrl: generateUrl('projects/:projectId/tasks'),
    createTaskUrl: generateUrl('tasks'),
    updateTaskUrl: generateUrl('tasks/{taskId}'),
    deleteTaskUrl: generateUrl('tasks/{taskId}'),
    getTaskCommentsUrl: generateUrl('tasks/{taskId}/comments'),
    getTaskAssigneesUrl: generateUrl('tasks/{taskId}/assignees'),

    createProjectUrl: generateUrl('projects'),
    getProjectUrl: generateUrl('projects/:projectId'),
    getProjectsUrl: generateUrl('projects'),
    getProjectByIdUrl: generateUrl('projects/:id'),
    updateProjectUrl: generateUrl('projects/:projectId'),
    deleteProjectUrl: generateUrl('projects/:projectId'),
    getProjectsByUserUrl: generateUrl('users/:userId/projects'),

    getTasksByLabelIdUrl: generateUrl('labels/:id/tasks'),
    getLabelByIdUrl: generateUrl('labels/:id'),
    createLabelUrl: generateUrl('labels'),
    updateLabelUrl: generateUrl('labels/:id'),
    deleteLabelUrl: generateUrl('labels/:id'),

    getTeamUrl: generateUrl('teams/:teamId'),
    createTeamUrl: generateUrl('teams'),
    updateTeamUrl: generateUrl('teams/:teamId'),
    deleteTeamUrl: generateUrl('teams/:teamId'),
    addMemberToTeamUrl: generateUrl('teams/:teamId/members'),
    removeMemberFromTeamUrl: generateUrl('teams/:teamId/members/:userId'),
    getTeamsUrl: generateUrl('teams'),
    getTeamByIdUrl: generateUrl('teams/{teamId}'),

    createTeamsUrl: generateUrl('teams'),
    updateTeamsUrl: generateUrl('teams/{teamId}'),
    deleteTeamsUrl: generateUrl('teams/{teamId}'),
    getTeamMembersUrl: generateUrl('teams/{teamId}/members'),

    getNoteByIdUrl: generateUrl('notes/:id'),
    createNoteUrl: generateUrl('notes'),
    updateNoteUrl: generateUrl('notes/:id'),
    deleteNoteUrl: generateUrl('notes/:id'),

    createNotificationsUrl: generateUrl('notifications'),
    getNotificationsUrl: generateUrl('notifications'),
    updateNotificationUrl: generateUrl('notifications/:id'),
    deleteNotificationsByIdUrl: generateUrl('notifications/:id'),
    
    
    searchUrl: generateUrl('search?q=:query'),
    // add more endpoints here as needed
    // Users Related URLs:
    getUsers: 'https://api.example.com/users',
    getUserById: 'https://api.example.com/users/{userId}',
    updateUser: 'https://api.example.com/users/{userId}',
    deleteUser: 'https://api.example.com/users/{userId}',
    getUserPosts: 'https://api.example.com/users/{userId}/posts',
    getUserTasks: 'https://api.example.com/users/{userId}/tasks',
    searchUsers: 'https://api.example.com/users/search',
    
    // Posts Related URLs:
    getPosts: 'https://api.example.com/posts',
    getPostById: 'https://api.example.com/posts/{postId}',
    createPost: 'https://api.example.com/posts',
    updatePost: 'https://api.example.com/posts/{postId}',
    deletePost: 'https://api.example.com/posts/{postId}',
    getPostComments: 'https://api.example.com/posts/{postId}/comments',
    getPostLikes: 'https://api.example.com/posts/{postId}/likes',
    
    // Task Related URLs:
    getTask: 'https://api.example.com/tasks/:taskId',
    getTasks: 'https://api.example.com/tasks',
    getTaskById: 'https://api.example.com/tasks/{taskId}',
    getTasksByProject: 'https://api.example.com/projects/:projectId/tasks',
    createTask: 'https://api.example.com/tasks',
    updateTask: 'https://api.example.com/tasks/{taskId}',
    deleteTask: 'https://api.example.com/tasks/{taskId}',
    getTaskComments: 'https://api.example.com/tasks/{taskId}/comments',
    getTaskAssignees: 'https://api.example.com/tasks/{taskId}/assignees',
    
    // Project Management URLs:
    createProject: 'https://api.example.com/projects',
    getProject: 'https://api.example.com/projects/:projectId',
    getProjects: 'https://api.example.com/projects',
    getProjectById: 'https://api.example.com/projects/:id',
    updateProject: 'https://api.example.com/projects/:projectId',
    deleteProject: 'https://api.example.com/projects/:projectId',
    getProjectsByUser: 'https://api.example.com/users/:userId/projects',
    
    //   Label Related URLs:
    getTasksByLabelId: 'https://api.example.com/labels/:id/tasks',
    getLabelById: 'https://api.example.com/labels/:id',
    createLabel: 'https://api.example.com/labels',
    updateLabel: 'https://api.example.com/labels/:id',
    deleteLabel: 'https://api.example.com/labels/:id',
    
    //Team Related URLs:
    getTeam: 'https://api.example.com/teams/:teamId',
    createTeam: 'https://api.example.com/teams',
    updateTeam: 'https://api.example.com/teams/:teamId',
    deleteTeam: 'https://api.example.com/teams/:teamId',
    addMemberToTeam: 'https://api.example.com/teams/:teamId/members',
    removeMemberFromTeam: 'https://api.example.com/teams/:teamId/members/:userId',
    getTeams: 'https://api.example.com/teams',
    getTeamById: 'https://api.example.com/teams/{teamId}',
    
    // Teams Related URLs:
    createTeams: 'https://api.example.com/teams',
    updateTeams: 'https://api.example.com/teams/{teamId}',
    deleteTeams: 'https://api.example.com/teams/{teamId}',
    getTeamMembers: 'https://api.example.com/teams/{teamId}/members',
    
    //   Note Related URLs:
    getNoteById: 'https://api.example.com/notes/:id',
    createNote: 'https://api.example.com/notes',
    updateNote: 'https://api.example.com/notes/:id',
    deleteNote: 'https://api.example.com/notes/:id',
    
    // Notification Related URLs:
    createNotifications: 'https://api.example.com/notifications',
    getNotifications: 'https://api.example.com/notifications',
    updateNotification: 'https://api.example.com/notifications/:id',
    deleteNotificationsById: 'https://api.example.com/notifications/:id',
    
    // Search Related URLs:
    search: 'https://api.example.com/search?q=:query',
    
    // Productivity Related Searches:
    searchGoals: 'https://api.example.com/goals?q=:query',
    searchHabits: 'https://api.example.com/habits?q=:query',
    searchTimers: 'https://api.example.com/timers?q=:query',
    searchReminders: 'https://api.example.com/reminders?q=:query',
    searchNotes: 'https://api.example.com/notes?q=:query',
    
    // Productivity Stat Searches:
    searchProductivityStats: 'https://api.example.com/productivity-stats?q=:query',
    searchTaskCompletionStats: 'https://api.example.com/task-completion-stats?q=:query',
    searchTeamProductivityStats: 'https://api.example.com/team-productivity-stats?q=:query',
    searchProjectProgressStats: 'https://api.example.com/project-progress-stats?q=:query',
    searchTimeTrackingStats: 'https://api.example.com/time-tracking-stats?q=:query',
    searchGoalProgressStats: 'https://api.example.com/goal-progress-stats?q=:query',

    // Communication Related Searches:
    searchMessages: 'https://api.example.com/messages?q=:query',
    searchAudioMessages: 'https://api.example.com/audio-messages?q=:query',
    searchTextMessages: 'https://api.example.com/text-messages?q=:query',
    searchVideoMessages: 'https://api.example.com/video-messages?q=:query',
    searchConversations: 'https://api.example.com/conversations?q=:query',
    
    // Task and Project Related Searches:
    searchTasks: 'https://api.example.com/tasks?q=:query',
    searchProjects: 'https://api.example.com/projects?q=:query',
    searchTasksByProjectId: 'https://api.example.com/tasks/project/:projectId?q=:query',
    
    //   Fitness Related Searches:
    searchWorkouts: 'https://api.example.com/workouts?q=:query',
    searchExercises: 'https://api.example.com/exercises?q=:query',
    searchNutrition: 'https://api.example.com/nutrition?q=:query',
    searchCalories: 'https://api.example.com/calories?q=:query',
    
    //   Financial Related Searches:
    searchStocks: 'https://api.example.com/stocks?q=:query',
    
    //   Lifestyle Related Searches:
    searchRecipes: 'https://api.example.com/recipes?q=:query',
    searchBooks: 'https://api.example.com/books?q=:query',
    
    //   Personal Information Management Related Searches:
    searchContacts: 'https://api.example.com/contacts?q=:query',
    searchEmails: 'https://api.example.com/emails?q=:query',
    searchCalendar: 'https://api.example.com/calendar?q=:query',
    
    //   Miscellaneous Searches:
    searchEvents: 'https://api.example.com/events?q=:query',
    searchNotifications: 'https://api.example.com/notifications?q=:query',
    searchUser: 'https://api.example.com/user?q=:query',
    searchStats: 'https://api.example.com/stats?q=:query',
    searchExport: 'https://api.example.com/export?q=:query',
    
    // Entertainment Related Searches:
    searchMovies: 'https://api.example.com/movies?q=:query',
    searchTVShows: 'https://api.example.com/tvshows?q=:query',
    searchMusic: 'https://api.example.com/music?q=:query',
    
    //   Media Related Searches:
    searchPodcasts: 'https://api.example.com/podcasts?q=:query',
    // News Related Searches
    searchNews: 'https://api.example.com/news?q=:query',
    
    searchQuotes: 'https://api.example.com/quotes?q=:query',
    searchJokes: 'https://api.example.com/jokes?q=:query',
    searchTrivia: 'https://api.example.com/trivia?q=:query',
    searchHoroscopes: 'https://api.example.com/horoscopes?q=:query',
    
    // Other Related Searches:
    searchWeather: 'https://api.example.com/weather?q=:query',
    searchPhotos: 'https://api.example.com/photos?q=:query',
    searchVideos: 'https://api.example.com/videos?q=:query',
    searchFiles: 'https://api.example.com/files?q=:query',
    searchLocations: 'https://api.example.com/locations?q=:query',
    searchLabels: 'https://api.example.com/labels?q=:query',
    
    // Communication and Collaboration URLs:
    sendMessage: 'https://api.example.com/messages',
    getMessage: 'https://api.example.com/messages/:messageId',
    updateMessage: 'https://api.example.com/messages/:messageId',
    deleteMessage: 'https://api.example.com/messages/:messageId',
    createMeeting: 'https://api.example.com/meetings',
    getMeeting: 'https://api.example.com/meetings/:meetingId',
    updateMeeting: 'https://api.example.com/meetings/:meetingId',
    deleteMeeting: 'https://api.example.com/meetings/:meetingId',
    createCall: 'https://api.example.com/calls',
    getCall: 'https://api.example.com/calls/:callId',
    updateCall: 'https://api.example.com/calls/:callId',
    deleteCall: 'https://api.example.com/calls/:callId',
    
    //#todo organize remaining below
    // Goal Related URLs:
    getGoals: 'https://api.example.com/goals',
    
    // Reminder Related URLs:
    getReminders: 'https://api.example.com/reminders',
    
    // Habit Related URLs:
    getHabits: 'https://api.example.com/habits',
    
    // Timer Related URLs:
    getTimers: 'https://api.example.com/timers',
    
    // Event Related URLs:
    getEvents: 'https://api.example.com/events',
    
    // Event Related URLs:
    getMeetings: 'https://api.example.com/meetings',
    
    // Contact Related URLs:
    getContacts: 'https://api.example.com/contacts',
    
    // Email Related URLs:
    getEmails: 'https://api.example.com/emails',
    
    // Calendar Related URLs:
    getCalendar: 'https://api.example.com/calendar',
    
    // Recipe Related URLs:
    getRecipes: 'https://api.example.com/recipes',
    
    // Fitness Related URLs:
    getFitness: 'https://api.example.com/fitness',
    
    // Sleep Related URLs:
    getSleep: 'https://api.example.com/sleep',
    
    // Meditation Related URLs:
    getMeditation: 'https://api.example.com/meditation',
    
    // Book Related URLs:
    getBooks: 'https://api.example.com/books',
    
    // Music Related URLs:
    getMusic: 'https://api.example.com/music',
    
    // Podcast Related URLs:
    getPodcasts: 'https://api.example.com/podcasts',
    
    // Movie Related URLs:
    getMovies: 'https://api.example.com/movies',
    
    // TV Show Related URLs:
    getTVShows: 'https://api.example.com/tvshows',
    
    // Miscellaneous URLs:
    
    // Quote Related URLs:
    getQuotes: 'https://api.example.com/quotes',
    
    // Joke Related URLs:
    getJokes: 'https://api.example.com/jokes',
    
    // Trivia Related URLs:
    getTrivia: 'https://api.example.com/trivia',
    
    // Horoscope Related URLs:
    getHoroscopes: 'https://api.example.com/horoscopes',
    
    // Weather Related URLs:
    getWeather: 'https://api.example.com/weather',
    
    // News Related URLs:
    getNews: 'https://api.example.com/news',
    
    // Stock Related URLs:
    getStocks: 'https://api.example.com/stocks',
}



export const apiConfig = {}



// //TODO CODE INCUDED AT THE BOTTOM
// Expanding on your usage of NX/NRWL, React, NestJS, Axios, GraphQL, and Prisma for your project architecture, the code I provided for creating a versioning tool remains applicable. However, you can adapt the tool's implementation and integration into your NX/NRWL monorepo as follows:

// Create a dedicated library in your NX/NRWL monorepo: Consider creating a new library specifically for your versioning tool. This library will contain the front-end code, such as React components, HTML, CSS, and JavaScript/TypeScript code, to build and display the versioning tool.

// Define API structure: In your NX/NRWL project, maintain the definition of your API structure as mentioned earlier in TypeScript interfaces or JSON objects. You can create a TypeScript file or JSON file within your shared library for this purpose. This structure will be used by both the front-end tool and any documentation you generate.

// Develop the front-end component: Within your dedicated versioning tool library, develop the React components, UI, and interactivity needed to display the API's structure. You can use popular libraries such as React, React Router, or GraphQL client libraries (e.g., Apollo Client) to create an interactive tool.

// Integrate the versioning tool: You can integrate the versioning tool into your NX/NRWL application. Depending on your project's structure, you may create a separate route or a dedicated section within your application for the versioning tool. You can use the react-router package to create routes or integrate it into your application's navigation.

// Display API information: Populate the versioning tool with API information from the structure you defined. When the user interacts with the tool, it can display details about API versions, endpoints, HTTP methods, request parameters, and response properties. Use the GraphQL code generated by Prisma to provide structured and up-to-date information about your API.

// Enhance integration: You can provide links to the versioning tool from your API documentation, allowing developers to explore the API's structure and make informed decisions while designing and developing their applications.

// Testing: Ensure that the versioning tool is thoroughly tested to provide accurate and reliable information about your API.

// By following these steps, you can integrate the versioning tool into your NX/NRWL monorepo and have it serve as a valuable resource for your team. Remember that the implementation specifics may vary based on your project's architecture, so adapt the code and tool as needed.



//TODO //CODE SET UP FOR API VERSIONING TOOL
// interface ApiEndpoint {
//     name: string;
//     method: string;
//     path: string;
//     requestParams: { [paramName: string]: string };
//     responseProperties: { [propName: string]: string };
//   }
  
//   interface ApiVersion {
//     version: string;
//     endpoints: ApiEndpoint[];
//   }
  
//   const apiVersions: ApiVersion[] = [
//     {
//       version: 'v1',
//       endpoints: [
//         {
//           name: 'Get Users',
//           method: 'GET',
//           path: '/users',
//           requestParams: { page: 'number', limit: 'number' },
//           responseProperties: { id: 'number', name: 'string', email: 'string' },
//         },
//         // Add more endpoints here...
//       ],
//     },
//     // Add more API versions here...
//   ];
  