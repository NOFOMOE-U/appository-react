import { rule } from 'graphql-shield';

// export const isAuthenticatedUser = rule()((_, __, { request }) => {
//   const userId = getUserById(request);
//   return Boolean(userId);
// });


export const isAuthenticatedUser = rule()(async (parent, args, ctx, info) => {
  return Boolean(ctx.user)
})


// todo set up
// import { MyCustomRequest } from 'path-to-my-custom-request';

// const isAuthenticatedUser = rule()((_, __, { request }) => {
//   const myRequest = new MyCustomRequest(request); // Initialize myRequest with your request
//   return myRequest.isAuthenticatedUser(); // Check if the user is authenticated
// });
