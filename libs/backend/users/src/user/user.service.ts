//Users/dixiejones/Development/main-app/appository-react/libs/backend/data-access/src/modules/user/user.service.ts
//module provides a higher-level abstraction that exposes specific user-related functionality (e.g. creating, updating, and deleting users) vs backendDataAccessService

// responsible for handling business logic and validation,
import { CustomRequestWithContext, YourRequestObject, emailUniquenessRule, validateUser } from '@appository/backend/data-access'
import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { validate } from 'class-validator'
import { createUser, deleteUser } from '../../../dist/libs/backend/data-access/src/interfaces/auth/authenticate'
import { MyContext } from '../../context/my-context'
import { hashPassword } from '../../interfaces/auth/user-with-password-hash'
import prisma from '../../lib/prisma/prisma'
import { PrismaService } from '../../lib/prisma/prisma.service'; //added because of dev/graphql
import { AccessLevel } from '../../make-api/api-config/access-level'
import { CustomRequestInit } from '../../make-api/requests/custom-request-init'
import errorMessages from '../../middleware/permissions/error-messages'
import { emailSchema } from '../../middleware/validation-yup-schemas/validate-email'
import userRegistrationSchema from '../../middleware/validation-yup-schemas/validate-registration'
import { validateUserSchema } from '../../middleware/validation-yup-schemas/validate-user'
import { validatePasswordAsync } from '../../middleware/validation-yup-schemas/validate-userInput'
import { BaseService } from '../../services/base-service'
import { UserWithAccessToken, UserWithoutSensitiveData } from './user'
import { getAllUsers } from './user-queries/get-all-users'
import { UserInput } from './user.input'



@Injectable()
export class UserService extends BaseService {
  private currentUser: UserWithoutSensitiveData | null = null
  accessLevel: AccessLevel
  request: YourRequestObject<CustomRequestInit>
  exposedUser: UserWithAccessToken | null

  constructor(private readonly prismaService: PrismaService, accessLevel: AccessLevel) {
    super(prismaService)
    this.request = new YourRequestObject<CustomRequestInit>()
    this.exposedUser = null
    this.accessLevel = accessLevel // todo accessLevel
  }

  accepts(types: string | string[] | undefined): (string | false | null)[] | undefined {
    return []
  }

  private readonly users: UserWithoutSensitiveData[] = [
    {
      id: '',
      name: 'Alice',
      email: 'alice@example.com',
      roles: ['USER'],
      username: 'youKnoMe',
      userProfileId: 0,
      groupId: null,
      accessLevel: 'FREE',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(),
      resetPasswordToken: null,
      passwordHash: undefined,
      confirmPassword: null,
      confirmPasswordMatch: null
    },
    {
      id: '',
      name: 'Bob',
      email: 'bob@example.com',
      username: 'youKnoMe',
      roles: ['USER'],
      userProfileId: 1,
      groupId: null,
      accessLevel: 'STANDARD',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(),
      resetPasswordToken: null,
      passwordHash: undefined, 
      confirmPassword: null,
      confirmPasswordMatch: null
    },
    {
      id: '',
      name: 'Charlie',
      email: 'charlie@example.com',
      roles: ['USER'],
      username: 'toBit',
      userProfileId: 2,
      groupId: null,
      accessLevel: 'PREMIUM',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(),
      resetPasswordToken: null,
      passwordHash: undefined,
      confirmPassword: null,
      confirmPasswordMatch: null
    },
  ]

  async validateUserInput(userInput: UserInput) {
    const errors = await validate(userInput)
    if (errors.length > 0) {
      throw new Error(errors.toString())
    }
  }

  async createUser( user: Prisma.UserCreateInput, context: MyContext): Promise<UserWithoutSensitiveData> {
    //validate user input against yup schema

    try {

       // Validate user input using custom rules
       await validateUser(user, prisma);

      // Validate user input using Yup schema
      await validateUserSchema.validate(user);

      // Validate email uniqueness using async rule
      await emailSchema.validate(user.email, { abortEarly: false });

      if(user.email){
      // Check email uniqueness
        emailUniquenessRule(prisma)
      }
      // Validate password using async function
      await validatePasswordAsync(user.password as string);


      await userRegistrationSchema.validate(user, { abortEarly: false }) // You can provide options here if needed
    } catch (error) {
      throw new Error(errorMessages.userNotRegistered)
    }

    //If the vaidation is successfully registered, proceed to create user
    return createUser(prisma, context, user)
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    await validateUserSchema.validate(data)
    return this.prismaService.updateUser(id, data)
  }

  async updateUserAccessLevel(userId: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    // Fetch the user based on their ID
    const user = await this.prismaService.getUserById(userId)

    if (user) {
      //Persist the uppdate user information to the database
      await validateUserSchema.validate(data)
      return this.prismaService.updateUser(userId, data)
    }
    return null
  }

  async deleteUser(id: string, context: MyContext, passwordHash: string): Promise<UserWithoutSensitiveData | null> {
    return deleteUser(id, context, passwordHash)
  }

  async getAllUsers(): Promise<UserWithoutSensitiveData[]> {
    return getAllUsers()
  }

  async getUserById(id: string): Promise<UserWithoutSensitiveData | null> {
    const user = await this.prismaService.getUserById(id)
    return this.sanitizeSensitiveData(user)
  }

  async getUserByEmail(email: string): Promise<UserWithoutSensitiveData | null> {
    const user = await this.prismaService.getUserByEmail(email)
    return this.sanitizeSensitiveData(user)
  }

  async setUser(user: UserWithoutSensitiveData): Promise<void> {
    this.currentUser = user
  }

  async getCurrentUser(): Promise<UserWithoutSensitiveData | null> {
    const user = this.currentUser

    if (user) {
      return user
    } else {
      return null
    }
  }

  private sanitizeSensitiveData(user: UserWithAccessToken | User | null): UserWithoutSensitiveData | null {
    if (user) {
      // Exclude sensitive information from the user object
      const { passwordHash, ...sanitizedUser } = user

      // Return the user object without sensitive data
      return sanitizedUser
    }
    return null
  }

  async changeUserPassword(userId: string, newPassword: string): Promise<boolean> {
    //ogic to change the user's password in the database
    //you migh want to hash the new password before storing it
    const hashedPassword = await hashPassword(newPassword)
    const updatedUser = await this.prismaService.updateUser(userId, {
      passwordHash: hashedPassword,
    })

    return updatedUser != null
  }

  async getApiUrl(endpoint: string): Promise<string> {
    //review if this is accurate and if not, where
    const baseUrl = 'https://example.com/api'

    // Combine the endpoint with the base URL
    return `${baseUrl}/${endpoint}`
  }

  async getBaseUrlForAccess() {
    // Fetch base URL from environment variables or configuration
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000/api'// todo update to your URL

    return baseUrl
  }



  // Method to get user ID from payment request
  getUserIdFromPayment(req: YourRequestObject<CustomRequestWithContext<MyContext>>): Promise<string | null> {
    // Extract user ID from the payment request (modify as needed based on your request structure)
    const userId = req.user?.id;
    return Promise.resolve(userId || null);
  }

  //todo connect tasks to prismaService
  // async getUserByTaskId(id: string): Promise<Task | null> {
  //   return this.prismaService.getUserByTaskId(id)
  // }
}
