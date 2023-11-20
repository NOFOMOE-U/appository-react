
import { Prisma } from '@prisma/client';
import prisma from '../../../lib/prisma/prisma';
import { UserWithoutSensitiveData } from '../user';
import { userSelect } from '../user-select';

export const updateUser = async (
    id: string,
    data: Prisma.UserCreateInput
  ): Promise<UserWithoutSensitiveData | null> => {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        passwordHash: undefined
      },
      select: {
        ...userSelect,
        passwordHash: false,
        resetPasswordToken: false,
      },
    });
  
    if (!user) {
      return null;
    }
  
    return { ...user };
  };
  
  