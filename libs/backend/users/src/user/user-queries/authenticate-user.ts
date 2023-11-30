import { prisma } from 'libs/backend/data-access/src/lib/prisma/prisma';
import { verifyPassword } from '../../../../data-access/src/interfaces/auth/user-with-password-hash';
import { UserWithoutSensitiveData } from '../user';
import { userSelect } from '../user-select';

export const authenticate = async (
    email: string,
    password: string
  ): Promise<UserWithoutSensitiveData | null> => {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        ...userSelect,
        passwordHash: true,
        resetPasswordToken: true,
      },
    });
  
    if (!user) {
      return null;
    }
  
    const isPasswordValid = password && user.passwordHash && await verifyPassword(password, user.passwordHash)
  
    if (!isPasswordValid) {
      return null
    }
  
    const { passwordHash, resetPasswordToken, ...userWithoutPassword } = user;
  
    return userWithoutPassword;
  };