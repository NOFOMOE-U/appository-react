import { rule } from 'graphql-shield'
import { getUserById } from '../../../modules/user/user-queries/get-user-by-id'
import errorMessages from '../error-messages'

export const isAuthenticatedUser = rule()(async (_, __, { request, prisma }) => {
  const userId = await getUserById(request)
  if (typeof userId !== 'string') {
    return new Error(errorMessages.notAuthorized)
  }

  // Your logic to check if the user is authenticated
  // For example, checking if the user exists in the database

  return true // Allow access if the user is authenticated
})

// todo set up
// import { MyCustomRequest } from 'path-to-my-custom-request';

// const isAuthenticatedUser = rule()((_, __, { request }) => {
//   const myRequest = new MyCustomRequest(request); // Initialize myRequest with your request
//   return myRequest.isAuthenticatedUser(); // Check if the user is authenticated
// });
