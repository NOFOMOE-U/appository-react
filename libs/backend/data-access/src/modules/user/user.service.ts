import { Injectable } from '@nestjs/common'
import { User, UserRole } from 'libs/backend/data-access/src/node_modules/.prisma/client'
import { PrismaService } from '../../lib/prisma/prisma.service'
import { UserInput } from './user.input'

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

  async createUser(data: UserInput): Promise<User> {
    return this.prisma.user.create({ data: { ...data, role: UserRole.USER } })
  }

  async updateUser(id: number, data: UserInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { ...data, role: UserRole.USER },
    })
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } })
  }

  async findById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  async findAll() {
    return this.prisma.user.findMany()
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async findUsers(): Promise<User[]> {
    return this.prisma.user.findMany()
  }
}
