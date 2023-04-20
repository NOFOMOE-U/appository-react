import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../interfaces/user/custom-request';
import createCustomContext, { CustomContextType } from './custom-context-types';

export const createContext = async (prisma: PrismaClient, req: CustomRequest<{}>): Promise<CustomContextType> => {
  const contextProps = await createCustomContext(prisma, req);
  const { currentUser } = contextProps
  
  const context: CustomContextType = {
    ...contextProps,
    ctx: {
      // additional properties for ctx can be added here
    },
    userId: currentUser ? currentUser.id : undefined,
    token: ''
  }

  return context
}














// import { PrismaClient, User } from '@prisma/client';
// import Jwt from 'jsonwebtoken';
// import { CustomRequest } from '../interfaces/user/custom-request';
// import { JwtPayload } from '../middleware/auth/jwt-payload';
// import { CustomContextType } from './custom-context-types';

// export const createContext = async (prisma: PrismaClient, req: CustomRequest<{}>): Promise<CustomContextType> => {
//   const authorizationHeader = req.headers.authorization
//   const token = authorizationHeader?.replace('Bearer ', '')

//   let userId: number | null = null
//   let currentUser: User | null = null

//   if (token) {
//     try {
//       const decodedToken = Jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
//       userId = decodedToken.userId
//       currentUser = await prisma.user.findUnique({
//         where: {
//           id: userId.toString(),
//         },
//       })
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const context: CustomContextType = {
//     id: '',
//     prisma,
//     userId: userId ? userId.toString() : undefined,
//     currentUser,
//     accessToken: token || null,
//     request: req,
//     customProp: '',
//     ctx: {
      
//     }
//   }

//   return context
// }