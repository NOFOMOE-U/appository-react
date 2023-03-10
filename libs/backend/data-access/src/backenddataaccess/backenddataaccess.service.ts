import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, User } from 'libs/backend/data-access/src/node_modules/.prisma/client';

@Injectable()
export class BackendDataAccessService {
  constructor(@Inject("PRISMA_CLIENT") private readonly prisma: PrismaClient) {}

  async createUser(input: User) {
    return this.prisma.user.create({ data: input });
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id: parseInt(id) }  });
  }

  async updateUser(id: string, input: Partial<User>) {
    return this.prisma.user.update({ where: { id: parseInt(id) } , data: input });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id: parseInt(id) }  });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
