// import { AccessLevel } from '@appository/backend/data-access';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient, User, UserProfile } from '@prisma/client';
import path from 'path';
import { AccessLevel } from '../../interfaces/auth/access-level';
import { PrismaContext } from '../../interfaces/prisma/prisma.interface';
import { CustomPrismaClient } from './prisma';

 
interface PrismaClientOptions {
  /**
   * Optional configuration for datasources.
   */
  datasources?: {
    [key: string]: {
      /**
       * The URL for the datasource.
       */
      url?: string | undefined;
    };
  };

  /**
   * Optional path to the Prisma schema file.
   */
  schema: string
  
  // ... other optional configuration properties can be added here
}



class TenantService {
  private tenantClients: Map<string, CustomPrismaClient> = new Map();

 
 getPrismaClient(tenantId: string, options: PrismaClientOptions): CustomPrismaClient {
    if (!this.tenantClients.has(tenantId)) {
      const { schema, ...restOptions } = options
      const client = new PrismaClient({
        datasources: {
          db: {
            url: `tenant-specific-database-url-for-${tenantId}`,
          },
        },
        // removed to figure out how to fix the error when it is set
        // causing it to be considered 'never'
        // schema: schema || 'default',
        ...restOptions,
      }) as CustomPrismaClient

      this.tenantClients.set(tenantId, client)
    }

    return this.tenantClients.get(tenantId)! as CustomPrismaClient
  }
}

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prisma!: CustomPrismaClient
  private isConnected: boolean = false
  private userId: string | null = null
  private taskId: string | null = null
  private tenantService: TenantService
  tenantId!: string

  constructor(private permissionsMatrix: Record<string, Record<string, Record<string, boolean>>> = {}) {
    this.tenantService = new TenantService()
    this.initPermissionsMatrix()
  }

  private initPermissionsMatrix() {
    this.permissionsMatrix = this.permissionsMatrix
  }

  setConnectionStatus(status: boolean) {
    // Implement logic to set the connection status
    // For example, store the status in a class property
    this.isConnected = status
  }

  getConnectionStatus(): boolean {
    // Getter method to retrieve the connection status
    return this.isConnected
  }

  async onModuleInit() {
    await this.connectPrisma('example-tenant-id')
    this.setConnectionStatus(true)
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect()
    this.setConnectionStatus(false)
  }

  async getClient() {
    this.prisma
  }

  async getTenantId(tenantId: string) {
    this.tenantId = tenantId
  }

  async getUsersByAccessLevel(userId: string, accessLevel: AccessLevel): Promise<User[] | null> {
    const users = await this.prisma.user.findMany({
      where: {
        id: userId
      }
    })

    const currentUsersAccessLevels = users.map((user) => ({
      ...user,
      accessLevel: accessLevel.toString()
    }))
    return currentUsersAccessLevels
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    return user
      ? {
          ...user,
          accessLevel: user.accessLevel as User['accessLevel'],
        }
      : null
  }

  async getUserProfile(): Promise<UserProfile | null> {
    if (!this.userId) {
      return null
    }
    return this.prisma.userProfile.findUnique({
      where: {
        userId: this.userId,
      },
    })
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    return user
      ? {
          ...user,
          accessLevel: user.accessLevel,
        }
      : null
  }

  private async connectPrisma(tenantId: string) {
    const options: PrismaClientOptions = {
      schema: path.join(__dirname, 'schema', 'schema.prisma'),
    }
    this.prisma = this.tenantService.getPrismaClient(tenantId, options)
    await this.prisma.$connect()
  }

  setUserId(userId: string | null) {
    this.userId = userId
  }

  async getContext(): Promise<PrismaContext> {
    return {
      id: (await this.getContext()).id,
      currentUser: (await this.getContext()).currentUser,
      token: (await this.getContext()).token,
      prisma: (await this.getContext()).prisma,
      cookies: (await this.getContext()).cookies,
      getUserId: () => this.userId,
      getPrisma: () => this.prisma,
    }
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    return this.prisma.user.update({
      where: { id },
      data,
      /// todo how do I add       accessLevel: user.accessLevel
    })
  }

  isAuthorized(user: User | undefined, resourceType: string, action: string): boolean {
    if (user) {
      const userRole = user.roles
      const permissions = this.permissionsMatrix[userRole as unknown as string]

      if (permissions && permissions[resourceType] && permissions[resourceType][action]) {
        return permissions[resourceType][action]
      }
    }
    // if not authorized, return false by default
    return false
  }
}