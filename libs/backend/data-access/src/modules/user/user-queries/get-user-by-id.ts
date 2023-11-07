import prisma from "../../../lib/prisma/prisma";
import { UserWithoutSensitiveData } from "../user";
import { userSelect } from '../user-select';

export const getUserById = async (
    userId: string
  ): Promise<UserWithoutSensitiveData | null> => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
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
  
  