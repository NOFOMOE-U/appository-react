import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaContext } from '../../interfaces/prisma/prisma.interface';
import { permissionsMatrix } from '../../middleware/permissions/permissions-matrix';
import { UserWithoutSensitiveData } from '../../modules/user/user';
import prisma, { CustomPrismaClient } from './prisma';
 // export interface PrismaContext {
//   prisma: PrismaClient
// }

 
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prisma:  CustomPrismaClient;
  private permissionsMatrix: {
    [key: string]: {
      [key: string]: {
        [key: string]: boolean
      }
    }
  } = {}
  private userId: string | null = null
  private taskId: string | null = null

  constructor() {
    this.prisma = prisma
    this.initPermissionsMatrix();
  }

  private initPermissionsMatrix() {
    this.permissionsMatrix = permissionsMatrix
  }

  async onModuleInit() {
    await this.prisma.$connect()
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect()
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? {...user} : null
  }

  // //todo set up tasks and connect how to find user by task id.
  // async getUserByTaskId(id: string): Promise<Task | null> {
  //   const userTask = await this.prisma.user.findUnique({where: {id}})
  //   return userTask ? {...userTask} : null
  // }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? {...user} : null
  }

  setUserId(userId: string | null){
    this.userId = userId
  }

  async getContext(): Promise<PrismaContext> {
    return {
      prisma: this.prisma,
      cookies: {},
      id: '',
      currentUser: {} as UserWithoutSensitiveData,
      token: '',
      getUserId: () => this.userId,
      getPrisma: () => this.prisma,
    }
  }  

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
  isAuthorized(user: User | undefined, resourceType: string, action: string): boolean {
    if (user) {
      const userRole = user.roles
      const permissions = permissionsMatrix.userRole

      if (permissions && permissions[resourceType] && permissions[resourceType][action]) {
        return permissions[resourceType][action]
      }
    }
    // if not authorized, return false by default
    return false
  }


}

export const getContext = async (): Promise<PrismaContext> => {
  const prismaService = new PrismaService()
  const prisma = await prismaService.getContext()
  return prisma
}

// todo
// In the isAuthorized method:

// user represents the user object for whom you want to check authorization.
// resourceType is the type of resource (e.g., 'project', 'task').
// action is the specific action (e.g., 'create', 'read', 'update', 'delete').
