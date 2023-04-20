// user-profile/user-profile.service.ts

import { Injectable } from '@nestjs/common';
import { Prisma, UserProfile } from '@prisma/client';
import { PrismaService } from '../../lib/prisma/prisma.service';

@Injectable()
export class UserProfileService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProfileCreateInput): Promise<UserProfile> {
    return this.prisma.userProfile.create({
      data,
    });
  }

  async findAll(): Promise<UserProfile[]> {
    return this.prisma.userProfile.findMany();
  }

  async findOne(id: number): Promise<UserProfile> {
    return this.prisma.userProfile.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    data: Prisma.ProfileUpdateInput,
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
