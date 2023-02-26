// import { PrismaClient, User } from '@appository/backend/data-access'

// const prisma = new PrismaClient()

// interface Context {
//   prisma: PrismaClient
//   currentUser?: User
// }

// async function getCurrentUser(request: any): Promise<User | null> {
//   const token = getToken(request)
//   if (!token) {
//     return null
//   }
//   try {
//     const verifiedToken = verify(token, process.env.JWT_SECRET) as {
//       userId: number
//       iat: number
//       exp: number
//     }
//     const currentUser = await prisma.user.findUnique({
//       where: { id: verifiedToken.userId },
//     })
//     return currentUser || null
//   } catch (error) {
//     return null
//   }
// }
// async function context({ req }: any) {
//   const currentUser = await getCurrentUser(req)
//   return {
//     prisma,
//     currentUser,
//   }
// }
