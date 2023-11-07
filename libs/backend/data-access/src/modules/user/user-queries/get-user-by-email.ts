
import prisma from '../../../lib/prisma/prisma';
import { UserWithoutSensitiveData } from '../user';
import { userSelect } from '../user-select';

export const getUserByEmail = async (
    email: string
  ): Promise<UserWithoutSensitiveData | null> => {
    const userWithSensitiveData = await prisma.user.findUnique({
      where: { email },
      select: {
        ...userSelect,
        passwordHash: true,
        resetPasswordToken: false,
      },
    });
  
    if (!userWithSensitiveData) {
      return null;
    }
  
    const {passwordHash, ...userWithoutSensitiveData} = userWithSensitiveData
    return userWithoutSensitiveData;
  };
  