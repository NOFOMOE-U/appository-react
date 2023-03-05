import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from 'libs/backend/data-access/src/node_modules/.prisma/client';

@Injectable()
export class BackendDataAccessService {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(input: User) {
    return this.prisma.user.create({ data: input });
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: string, input: Partial<User>) {
    return this.prisma.user.update({ where: { id }, data: input });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
