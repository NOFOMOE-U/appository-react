import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma/prisma";
import { UserWithoutSensitiveData } from "./user";
import { userSelect } from './user-select';


export const createUser = async (
    data: Prisma.UserCreateInput
  ): Promise<UserWithoutSensitiveData> => {
  
    const createdUser = await prisma.user.create({
      data: data,
      select: {
        ...userSelect,
        passwordHash: false,
        resetPasswordToken: false 
      },
    });
  
    return { ...createdUser };
  };
  