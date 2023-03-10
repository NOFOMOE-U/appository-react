import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { PrismaClient, User } from 'libs/backend/data-access/src/node_modules/.prisma/client'; //-- changed from
import { PrismaClient } from '@prisma/client';
import { User } from 'libs/backend/data-access/src/node_modules/.prisma/client';

import { User as UserType } from './types';
import { UserInput } from './user.input';
import { UserService } from './user.service';

const prisma = new PrismaClient();

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserType])
  async users(): Promise<User[]> {
    return prisma.user.findMany();
  }

  @Query(() => UserType)
  async user(@Args('id') id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  @Mutation(() => UserType)
  async createUser(@Args('data') data: UserInput): Promise<User> {
    return prisma.user.create({ data });
  }

  @Mutation(() => UserType)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UserInput,
  ): Promise<User | null> {
    return prisma.user.update({ where: { id }, data });
  }

  @Mutation(() => UserType)
  async deleteUser(@Args('id') id: number): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }
}
