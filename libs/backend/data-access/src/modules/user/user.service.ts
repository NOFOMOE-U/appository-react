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




// @Injectable()
// export class UserService {
//   constructor(private readonly prisma: PrismaService) {}

//   private readonly users: User[] = [
//     {
//       id: 1,
//       name: 'Alice',
//       email: 'alice@example.com',
//       role: 'ADMIN',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       id: 2,
//       name: 'Bob',
//       email: 'bob@example.com',
//       role: 'ADMIN',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       id: 3,
//       name: 'Charlie',
//       email: 'charlie@example.com',
//       role: 'ADMIN',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   ]

//   async createUser(data: UserInput): Promise<User> {
//     return this.prisma.user.create({
//       data: {
//         ...data,
//         role: UserRole.USER,
//         id: undefined
//       }
//     })
//   }

//   async updateUser(id: number, data: UserInput): Promise<User> {
//     return this.prisma.user.update({
//       where: { id },
//       data: {
//         name: data.name,
//         email: data.email,
//         role: data.role,
//         createdAt: data.createdAt,
//         updatedAt: data.updatedAt,
//       },
//     })
//   }

//   async deleteUser(id: number): Promise<User> {
//     return this.prisma.user.delete({ where: { id } })
//   }

//   async findById(id: number): Promise<User> {
//     return this.prisma.user.findUnique({
//       where: { id },
//     })
//   }

//   async findAll() {
//     return this.prisma.user.findMany()
//   }

//   async findUserByEmail(email: string): Promise<User> {
//     return this.prisma.user.findUnique({ where: { email } })
//   }

//   async findUsers(): Promise<User[]> {
//     return this.prisma.user.findMany()
//   }
// }
