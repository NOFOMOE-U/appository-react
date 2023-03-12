//Users/dixiejones/Development/main-app/appository-react/libs/backend/data-access/src/modules/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'libs/backend/data-access/src/node_modules/.prisma/client';
import { PrismaService } from '../../lib/prisma/prisma.service'; //added because of dev/graphql
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './user';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly users: User[] = [
        {
          id: 1,
          name: 'Alice',
          email: 'alice@example.com',
          role: 'ADMIN',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Bob',
          email: 'bob@example.com',
          role: 'ADMIN',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Charlie',
          email: 'charlie@example.com',
          role: 'ADMIN',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return createUser(data);
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User | null> {
    return updateUser(id, data);
  }

  async deleteUser(id: number): Promise<User | null> {
    return deleteUser(id);
  }

  async getAllUsers(): Promise<User[]> {
    return getAllUsers();
  }

  async getUserById(id: number): Promise<User | null> {
    return getUserById(id);
  }
}