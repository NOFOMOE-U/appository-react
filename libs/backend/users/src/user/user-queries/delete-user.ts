import prisma from "../../../lib/prisma/prisma";
import { UserWithoutSensitiveData } from "../user";
import { userSelect } from '../user-select';

export const deleteUser = async (
    id: string
  ): Promise<UserWithoutSensitiveData | null> => {
    const user = await prisma.user.delete({
      where: { id },
      select: {
        ...userSelect,
        passwordHash: false,
        resetPasswordToken: true,
      },
    });
  
    if (!user) {
      return null;
    }
  
    return { ...user };
  };