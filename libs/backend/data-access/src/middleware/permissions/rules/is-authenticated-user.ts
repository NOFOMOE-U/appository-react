import { getUserById } from '@appository/backend/users'
import { UserRole } from '@prisma/client'
import { rule } from 'graphql-shield'
import errorMessages from '../../../../../../shared-features/reports/src/error-messages'

export const isAuthenticatedUser = rule()(async (_, __, { request, prisma }) => {
  const userId = await getUserById(request)
  if (typeof userId !== 'string') {
    return new Error(errorMessages.notAuthorized)
  }

  // Your logic to check if the user is authenticated
  // For example, checking if the user exists in the database

  return true // Allow access if the user is authenticated
})




export const hasRole = (role: UserRole) => rule({ cache: 'strict' })(
  async (parent, args, ctx, info) => {
    // Check if the user has the required role
    return ctx.user && ctx.user.roles.includes(role);
  }
);

// todo set up
// import { MyCustomRequest } from 'path-to-my-custom-request';

// const isAuthenticatedUser = rule()((_, __, { request }) => {
//   const myRequest = new MyCustomRequest(request); // Initialize myRequest with your request
//   return myRequest.isAuthenticatedUser(); // Check if the user is authenticated
// });
