import { Inject, Injectable } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import { hashPassword } from '../interfaces/auth/user-with-password-hash'
import { UserWithoutSensitiveData } from '../modules/user/user'

type UserCreateInputWithoutSensitiveData = Omit<
  Prisma.UserCreateInput,
  'resetPasswordToken' | 'password' | 'passwordHash'
> & {
  passwordHash: string
  resetPasswordToken?: string
}

@Injectable()
export class BackendDataAccessService {
  constructor(@Inject(PrismaClient) private readonly prisma: PrismaClient) {}

  async createUser(userData: UserCreateInputWithoutSensitiveData): Promise<UserCreateInputWithoutSensitiveData> {
    const hashedPassword = await hashPassword(userData.passwordHash)
    const createdUser = await this.prisma.user.create({
      data: {
        ...userData,
        passwordHash: hashedPassword,
      },
    })
    if (!createdUser) {
      throw new Error('Failed to create user')
    }
    return createdUser
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id.toString() },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        passwordHash: false,
      },
    })
  }

  async updateUser(id: string, input: Partial<UserWithoutSensitiveData>) {
    const data = input as Prisma.UserUpdateInput // convert input to expected type
    return this.prisma.user.update({ where: { id: id.toString() }, data })
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id: id.toString() } })
  }

  async getAllUsers() {
    return this.prisma.user.findMany()
  }
}
