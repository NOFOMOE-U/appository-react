// user-profile/user-profile.service.ts

import { Injectable } from '@nestjs/common';
import { Prisma, UserProfile } from '@prisma/client';
import { PrismaService } from '../../lib/prisma/prisma.service';

@Injectable()
export class UserProfileService  {
    constructor(
      private readonly prisma: PrismaService,
      private readonly userProfile: UserProfile,
    ) { }

  async create(data: Prisma.UserProfileCreateInput): Promise<UserProfile> {
    return await this.prisma.getUserProfile.create({
      data,
    });
  }

  async findAll(): Promise<UserProfile[]> {
    return (await this.prisma);
  }

  async findUserProfileByName(id: number): Promise<UserProfile> {
    const user = await this.prisma.getUserById(id  as unknown as string);
    return this.prisma.userProfile.findUnique({
      where: {
        id,
        user: {
          id: user.id
        }
      }
    })
      
  }

  async getUserProfilesByUserId(userId: string): Promise<UserProfile[]> {
    return this.prisma.userProfile.findMany({
      where: {
        user: {
          id: userId
        }
      }
    });
  }

  async update(
    id: number,
    data: Prisma.UserProfileUpdateInput,
  ): Promise<UserProfile> {
    return this.prisma.userProfile.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<void> {
    return this.prisma.userProfile.delete({
      where: { id },
    });
  }
}
