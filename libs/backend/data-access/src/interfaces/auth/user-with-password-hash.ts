import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';


export interface UserWithPasswordHash extends User {
  passwordHash: string ;
}

export async function hashPassword(password: string): Promise<string> {
  // number of salt rounds
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export const verifyPassword = async (password: string, passwordHash: string): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash)
}
