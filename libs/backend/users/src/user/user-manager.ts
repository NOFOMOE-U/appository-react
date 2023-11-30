import { User, UserRole } from '@appository/backend/data-access'
import {
  Prisma,
  PrismaClient,
} from '@prisma/client'
import { NextFunction, Response } from 'express-serve-static-core'
import { AccessLevel } from 'libs/backend/data-access/src/interfaces/auth/access-level'
import { CustomPrismaClient } from 'libs/backend/data-access/src/lib/prisma/prisma'
import { AuthenticatedSession, authenticateUser } from 'libs/backend/data-access/src/middleware/user/user.middleware'
import generateToken from 'libs/backend/data-access/src/utils/generate-token.utils'
import errorMessages from 'libs/shared-features/reports/src/error-messages'
import { isAuthenticatedUser } from '../../../data-access/src/middleware/permissions/rules/is-authenticated-user'
import { UserWithoutSensitiveData } from './user'



const prisma = new PrismaClient()

export class UserManagerService {
  private prisma: CustomPrismaClient
  trackUserBehavior: any
  userManager: UserManagerService

  constructor(private readonly prismaService: CustomPrismaClient) {
    this.prisma = prismaService
    this.userManager = new UserManagerService(this.prisma)
  }

  // User Registration
  async createUser(user: UserManagerService): Promise<UserWithoutSensitiveData | null> {
    // Implement user registration logic here
    // Map User object to UserCreateInput
    const { confirmPassword, confirmPasswordMatch, ...userData } = user

    const userCreateInput: Prisma.UserCreateInput = {
      ...userData,
      roles: {
        set: user.roles as unknown as UserRole[],
      },
      confirmPassword: user.confirmPassword || '',
      confirmPasswordMatch: user.confirmPasswordMatch || ''
    }

    // You can use the Prisma client to create a new user in the database
    const newUser = (await this.prisma.user.create({
      data: userCreateInput,
    })) as unknown as UserWithoutSensitiveData
    return newUser
  }

  // User Profile Management
  async updateUserProfile(userId: string, updatedUser: Partial<User>): Promise<User | null> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id: userId },
      })

      if (!existingUser) {
        throw new Error('User not found')
      }

      // Ensure that confirmPassword and confirmPasswordMatch are not included in the update
      const { confirmPassword, confirmPasswordMatch, ...updateData } = updatedUser

      const updatedUserProfile = await this.prisma.user.update({
        where: { id: userId },
        data: updateData,
      })

      return updatedUserProfile
    } catch (error) {
      console.error('Error updating user profile:', error)
      return null
    }
  }
// / Method to update user access level
  async updateUserAccessLevel(userId: string, newAccessLevel: AccessLevel): Promise<User | null> {
    try {
      // 'User' manager and a method to update access level in data layer
      const updatedUser = await this.userManager.updateUserAccessLevel(userId, newAccessLevel);
      return updatedUser
    } catch (error) {
      // Handle error appropriately
      console.error('Error updating user access level:', error)
      return null
    }
  }

  // Add more methods for user role management, password management, and other user-related operations
}

export default UserManagerService

const userManager = new UserManagerService(prisma)
const user = await prisma.user.findUnique({ where: { id: '' } })

if (user) {
  const passwordHash = generateToken(user)
  // Example usage:
  const newUser: Omit<Prisma.UserCreateInput, 'confirmPassword' | 'confirmPasswordMatch'> = {
    id: '2',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    roles: [UserRole.USER],
    userProfileId: null,
    resetPasswordToken: null,
    accessLevel: 'FREE',
    updatedAt: new Date(),
    createdAt: new Date(Date.now()),
    passwordHash: passwordHash, // You should hash the password
    ...(user.confirmPassword && { confirmPassword: user.confirmPassword }),
    ...(user.confirmPasswordMatch && { confirmPasswordMatch: user.confirmPasswordMatch }),  
  }

  
  // Register a new user
  userManager
    .createUser({
      ...newUser,
      username: newUser.username ?? '',
      confirmPassword: '',
      confirmPasswordMatch: ''
    })

    .then((user) => {
      console.log('User created:', user)
    })
}

// Authenticate a user
userManager.updateUserProfile.arguments = async (email: string, password: string, next: NextFunction) => {
  try {
    authenticateUser({} as AuthenticatedSession, {} as Response, next).then((user) => {
      console.log('Authenticated user:', user)
      next
    })
    isAuthenticatedUser
  } catch (error) {
    //is not authenticated
    !isAuthenticatedUser
    next(errorMessages.invalidCredentials)
  }
  
}


