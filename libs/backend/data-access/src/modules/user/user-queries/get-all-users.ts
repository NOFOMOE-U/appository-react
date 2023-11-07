import { UserWithoutSensitiveData } from '@appository/backend/data-access';
import prisma from "../../../lib/prisma/prisma";
import { userSelect } from "../user-select";
export const getAllUsers = async (): Promise<UserWithoutSensitiveData[]> => {
    const users = await prisma.user.findMany({
      select: {
        ...userSelect,
        passwordHash: false,
        resetPasswordToken: false,
      },
    });
  
    return users.map((user) => ({ ...user }));
  };
  