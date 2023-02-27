import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PrismaClient } from '@prisma/client'
import { User as PrismaUser, UserRole } from 'libs/backend/data-access/src/node_modules/.prisma/client'
import { User } from './types'
import { UserInput } from './user.input'
import { UserService } from './user.service'
const prisma = new PrismaClient()

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [User])
  async users(): Promise<PrismaUser[]> {
    const prisma = new PrismaClient()
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  @Query(() => User)
  async user(@Args('id') id: number): Promise<PrismaUser> {
    const prisma = new PrismaClient()
    return prisma.user.findUnique({ where: { id } })
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: UserInput): Promise<PrismaUser> {
    const prisma = new PrismaClient()
    return prisma.user.create({
      data: {
        ...data, 
        role: UserRole.USER
      }
    })
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: number, @Args('data') data: UserInput): Promise<PrismaUser> {
    const prisma = new PrismaClient()
    return prisma.user.update({where: { id },data })
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: number): Promise<PrismaUser> {
    const prisma = new PrismaClient()
    return prisma.user.delete({ where: { id } })
  }
}
