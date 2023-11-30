import { User as UserType } from '@appository/backend/data-access';
import { UserRoleEnum } from '@appository/backend/users';
import { errorMessages } from '@appository/shared-features/reports';
import { PrismaClient } from '@prisma/client';
import { MiddlewareFn } from "type-graphql";

const prisma = new PrismaClient();

// middleware function to check if user is authorized to create a resource
export const createPermissions: MiddlewareFn<any> = async ({ root, args, context }, next) => {
    const allowedRoles = Object.values(UserRoleEnum) as string[]
    const userId = context.userId
    
    if (!userId) {
      throw new Error(errorMessages.notAuthenticated)
    }
  
    // Fetch the user from the database
    const user: UserType | null = await prisma.user.findUnique({where:{id:userId}})
    if (!user || !user.roles.every((role: any) => allowedRoles.includes(role.toString()))) {
      throw new Error(errorMessages.notAuthorized)
    }
    await next()
  }