import { Prisma, PrismaClient, User, UserRole } from '@prisma/client';
import { Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { CustomPrismaClient } from '../../lib/prisma/prisma';
import errorMessages from '../../middleware/permissions/error-messages';
import { isAuthenticatedUser } from '../../middleware/permissions/rules/is-authenticated-user';
import { AuthenticatedSession, authenticateUser } from '../../middleware/user/user.middleware';

const prisma = new PrismaClient();

class UserManager {
  private prisma: CustomPrismaClient;

  constructor(private readonly prismaService: CustomPrismaClient) {
    this.prisma = prismaService; 
  }


  // User Registration
  async createUser(user: Prisma.UserCreateInput): Promise<User | null> {
    // Implement user registration logic here
    // You can use the Prisma client to create a new user in the database
    const newUser = await this.prisma.user.create({ data: user });
    return newUser;
  }

  // User Profile Management
  async updateUserProfile(userId: string, updatedUser: Partial<User>): Promise<User | null> {
    // Implement user profile update logic here
    // Use Prisma to update the user's profile
    return null; // Replace with actual update logic
  }

  // Add more methods for user role management, password management, and other user-related operations
}

export default UserManager;

const userManager = new UserManager(prisma);

// Example usage:
const newUser: User = {
  id: '2',
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  passwordHash: `null`, // You should hash the password
    roles: [UserRole.USER],
    createdAt: new Date,
    updatedAt: new Date,
    resetPasswordToken: null,
    userProfileId: null
  // Add other user properties
};

// Register a new user
userManager.createUser({
  ...newUser,
  passwordHash: newUser.passwordHash ?? '' 
}).then((user) => {
  console.log('User created:', user);  
});

// Authenticate a user
userManager.updateUserProfile.arguments = async (email: string, password: string, next: NextFunction) => {
  try {
    authenticateUser(
      {} as AuthenticatedSession,
      {} as Response,
      next
      ).then((user) => {
        console.log('Authenticated user:', user);
        next
      }
    );
    isAuthenticatedUser 
  } catch (error) {
    //is not authenticated
    !isAuthenticatedUser
    next(errorMessages.invalidCredentials);;

  }
}
