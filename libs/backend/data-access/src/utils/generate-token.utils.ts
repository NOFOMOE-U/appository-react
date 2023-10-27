// src/utils/auth.ts
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

const generateToken = (user: User) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    roles: user.roles,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    resetPasswordToken: user.resetPasswordToken,
    userProfileId: user.userProfileId
  }
  return sign(payload, process.env.JWT_SECRET!, { expiresIn: '15m' })
}

export default generateToken
