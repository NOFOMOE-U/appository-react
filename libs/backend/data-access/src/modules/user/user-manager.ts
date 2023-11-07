import { PrismaClient, User, UserRole } from '@prisma/client';
import { UserWithoutSensitiveData } from './user';
import { authenticateUser } from '../../middleware/user/user.middleware';
const prisma = new PrismaClient();

class UserManager {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  // User Registration
  async createUser(user: User): Promise<UserWithoutSensitiveData | null> {
    // Implement user registration logic here
    // You can use the Prisma client to create a new user in the database
    const newUser = await this.prisma.user.create({ data: user });
    return newUser;
  }

//   // User Authentication
//   async authenticateUser(email: string, password: string): Promise<User | null> {
//     // Implement user authentication logic here
//     // Use Prisma to find the user by email, check the password, and return the user
//     return null; // Replace with actual authentication logic
//   }

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
userManager.createUser(newUser).then((user) => {
  console.log('User created:', user);
});

// Authenticate a user
userManager.authenticateUser('john@example.com', 'password').then((user) => {
  console.log('Authenticated user:', user);
});
