export default {
  //permission errors
  missingPermissions: "You don't have the necessary permissions to perform this action.",
  invalidCredentials: 'Invalid credentials.',
  resourceNotFound: 'The requested resource was not found.',
  serverError: 'An unexpected error occurred on the server. Please try again later.',
  badRequest: 'The request was invalid or cannot be otherwise served.',
  notAuthorized: "You don't have permission to access this resource.",
  notLoggedIn: ' You are not currently logged in to access this content.',
  notAuthenticated: 'You must be authenticated to take this action',
  unknownError: 'An unknown error occurred. Please try again.',
  
  //post errors
  postNotFound: 'The requested post was not found.',
  //task errors
  taskNotValidated: 'Error validating task: ',
  //email now unique
  emaillNotUnique: 'Email is already registered',

  // Project errors
  projectNotFound: 'The requested project was not found.',
  projectAlreadyExists: 'A project with the same name already exists. Please choose a different name.',
  projectCreationError: 'Error creating the project. Please try again later.',
  
  // Team errors
  teamNotFound: 'The requested team was not found.',
  teamAlreadyExists: 'A team with the same name already exists. Please choose a different name.',
  teamCreationError: 'Error creating the team. Please try again later.',
  
  // Task errors
  taskNotFound: 'The requested task was not found.',
  taskAssignmentError: 'Error assigning the task to a team member.',
  
  // User errors
  userAlreadyInTeam: 'This user is already a member of the team.',
  userNotInTeam: "The user is not part of the team, so the action cannot be performed.",
  userNotProjectMember: "The user is not a member of the project.",
  
  // Custom error messages
  customError1: 'A custom error message to handle a specific scenario in your app.',
  customError2: 'Another custom error message for unique situations.',







   // User management errors
   userNotFound: 'Sorry, this user profile was not found, please ensure user exists',
   userAlreadyExists: 'A user with this email or username already exists.',
   unableToUpdateUser: 'Unable to update user information. Please try again later.',
   unableToCreateUser: 'Unable to create a new user. Please check the provided information.',
   unableToDeleteUser: 'Unable to delete the user. Ensure the user exists and is not associated with important data.',
   
   // Password-related errors
   passwordMismatch: 'The provided password does not match the user\'s current password.',
   passwordUpdateError: 'Error updating the user\'s password. Please verify the request and try again.',
   passwordRequirements: 'Password must meet certain requirements (e.g., length, complexity).',
   
   // Authentication and authorization errors
   authenticationFailed: 'Authentication failed. Please check your credentials.',
   unauthorizedAccess: 'Unauthorized access. You do not have the necessary permissions for this action.',
   userNotLoggedIn: 'The user is not currently logged in. Please log in to access this content.',
   
   // Custom user management errors
   customUserError1: 'A custom user management error message to handle unique situations.',
   customUserError2: 'Another custom user management error message for specific scenarios.',
   

   // Header issues
  missingContentTypeHeader: 'The "Content-Type" header is missing in the request.',
  unsupportedContentType: 'The provided "Content-Type" is not supported for this request.',
  missingAuthorizationHeader: 'The "Authorization" header is missing in the request.',
  invalidAuthorizationHeader: 'Invalid "Authorization" header format.',

  // Socket issues
  socketConnectionError: 'Error connecting to the socket server.',
  socketAuthenticationFailed: 'Failed to authenticate with the socket server.',
  socketTimeout: 'The socket connection timed out.',
  socketDisconnected: 'The socket connection was unexpectedly disconnected.',

  // Request issues
  invalidRequestBody: 'The request body is invalid or missing.',
  invalidQueryParam: 'Invalid query parameter in the request.',
  requestValidationFailed: 'Request validation failed. Please check the provided data.',
  resourceConflict: 'The resource is in conflict with another request or resource.',
  
} as { [key: string]: string }
 