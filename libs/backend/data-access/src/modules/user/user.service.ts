//Users/dixiejones/Development/main-app/appository-react/libs/backend/data-access/src/modules/user/user.service.ts
//module provides a higher-level abstraction that exposes specific user-related functionality (e.g. creating, updating, and deleting users) vs backendDataAccessService

// responsible for handling business logic and validation,
import { YourRequestObject } from '@appository/backend/data-access';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { validate } from 'class-validator';
import { createUser, deleteUser } from '../../../dist/libs/backend/data-access/src/interfaces/auth/authenticate';
import { MyContext } from '../../context/my-context';
import { hashPassword } from '../../interfaces/auth/user-with-password-hash';
import { PrismaService } from '../../lib/prisma/prisma.service'; //added because of dev/graphql
import { CustomRequestInit } from '../../make-api/requests/custom-request-init';
import errorMessages from '../../middleware/permissions/error-messages';
import { validateUserSchema } from '../../middleware/validation-yup-schemas/validate-user';
import { UserWithAccessToken, UserWithoutSensitiveData } from './user';
import { getAllUsers } from './user-queries/get-all-users';
import { UserInput } from './user.input';
 
@Injectable()
export class UserService {
  private currentUser?: UserWithAccessToken
  private accessTier?: AccessTier
  request: YourRequestObject<CustomRequestInit>
  user: UserWithAccessToken | null
  
  constructor(
    private readonly prismaService: PrismaService,
    private accessTier: AccessTier
  ) {
    this.request = new YourRequestObject<CustomRequestInit>()
    this.user = null
    this.accessTier = accessTier
  }

  accepts(types: string | string[] | undefined): (string | false | null)[] | undefined {
    return []
  }

  private readonly users: User[] = [
    {
      id: '',
      name: 'Alice',
      email: 'alice@example.com',
      roles: ['USER'],
      username: 'youKnoMe',
      userProfileId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      resetPasswordToken: '',
      passwordHash: '',
    },
    {
      id: '',
      name: 'Bob',
      email: 'bob@example.com',
      username: 'youKnoMe',
      roles: ['USER'],
      userProfileId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      resetPasswordToken: '',
      passwordHash: '',
    },
    {
      id: '',
      name: 'Charlie',
      email: 'charlie@example.com',
      roles: ['USER'],
      username: 'toBit',
      userProfileId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      resetPasswordToken: '',
      passwordHash: '',
    },
  ]

  async validateUserInput(userInput: UserInput) {
    const errors = await validate(userInput)
    if (errors.length > 0) {
      throw new Error(errors.toString())
    }
  }

  async createUser(
    data: Prisma.UserCreateInput,
    context: MyContext,
    passwordHash: string,
  ): Promise<UserWithoutSensitiveData> {
    //validate user input
    await this.validateUserInput(data)
    await validateUserSchema.validate(data)
    return createUser(data, context, passwordHash)
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    await validateUserSchema.validate(data)
    return this.prismaService.updateUser(id, data)
  }

  async updateUserAccessTier(userId: string): Promise<User | null>{
    // Fetch the user based on their ID
    const user = await this.prismaService.getUserById(userId)

    if (user) {
     
      //Persist the updpdate user information to the database
      return this.prismaService.updateUser(userId)
    }
      return null;
  }

  async deleteUser(id: string, context: MyContext, passwordHash: string): Promise<UserWithoutSensitiveData | null> {
    return deleteUser(id, context, passwordHash)
  }

  async getAllUsers(): Promise<UserWithoutSensitiveData[]> {
    return getAllUsers()
  }

  async getUserById(id: string): Promise<User | null> {
    return this.prismaService.getUserById(id)
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.getUserByEmail(email)
  }

  async setUser(user: UserWithAccessToken): Promise<void> {
    this.currentUser = user;
    this.accessTier = this.accessTier
  }

  async getCurrentUser(): Promise<UserWithAccessToken | null> {
    return this.currentUser || null
  }


  async changeUserPassword(userId: string, newPassword: string): Promise<boolean>{
    //ogic to change the user's password in the database
    //you migh want to hash the new password before storing it
    const hashedPassword = await hashPassword(newPassword);
    const updatedUser = await this.prismaService.updateUser(userId, {
      passwordHash: hashedPassword
    })

    return updatedUser != null
  }

  async getApiUrl(endpoint: string): Promise<string> {
    //review if this is accurate and if not, where
    const baseUrl = 'https://example.com/api'

    // Combine the endpoint with the base URL
    return `${baseUrl}/${endpoint}`
  }

  private getBaseUrlForAccess(): string { 
    if (!this.accessTier) {
      throw new Error(errorMessages.NoUrlAccess)
    }

    const baseUrls: Record<AccessTier, string> = {
      free: 'https://example.com/api/free',
      standard: 'https://example.com/api/free', // Adjust as needed
      premium: 'https://example.com/api/premium',
      enterprise: 'https://example.com/api/enterprise',
    }
    //Retrieve the appropriate base UR based on the user's access level
    return baseUrls[this.accessTier]
  }


  //todo connect tasks to prismaService
  // async getUserByTaskId(id: string): Promise<Task | null> {
  //   return this.prismaService.getUserByTaskId(id)
  // }
  }
const prismaService = new PrismaService()

const userService: UserService = new UserService(prismaService, accessTier)




