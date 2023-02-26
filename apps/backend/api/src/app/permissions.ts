// import { rule, shield } from 'graphql-shield';

// export const isAuthenticated = rule({ cache: 'contextual' })(
//   async (parent, args, ctx, info) => {
//     const user = ctx.user
//     if (!user) {
//       return false
//     }
//     return true
//   },
// )

// // export const permissions = shield({
// //     Query: {
// //         exmapleQuery: isAuthenticated
// //     },
// //     Mutation: {
// //         exampleMutation: isAuthenticated
// //     }
// // })

// export const isAdmin = rule({ cache: 'contextual' })(
//   async (parent, args, ctx, info) => {
//     const user = ctx.user
//     if (!user) {
//       return false
//     }
//     if (user.role !== 'admin') {
//       return false
//     }
//     return true
//   },
// )

// export const isEditor = rule({ cache: 'contextual' })(
//   async (parent, args, ctx, info) => {
//     const user = ctx.user
//     if (!user) {
//       return false
//     }
//     if (user.role !== 'editor') {
//       return false
//     }
//     return true
//   },
// )

// export const canReadPost = rule({ cache: 'contextual' })(
//   async (parent, { id }, ctx, info) => {
//     const post = await ctx.prisma.post.findUnique({ where: { id } })
//     if (!post) {
//       return false
//     }
//     if (!post.published) {
//       const user = ctx.user
//       if (!user) {
//         return false
//       }
//       if (user.role !== 'admin' && user.id !== post.authorId) {
//         return false
//       }
//     }
//     return true
//   },
// )

// export const permissions = shield({
//   Query: {
//     post: canReadPost,
//     posts: isAuthenticated,
//   },
//   Mutation: {
//     createPost: isAuthenticated,
//     updatePost: or(isAdmin, and(isEditor, canReadPost)),
//     deletePost: isAdmin,
//   },
// })
