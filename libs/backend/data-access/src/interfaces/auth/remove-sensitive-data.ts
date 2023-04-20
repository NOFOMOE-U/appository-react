// src/utils/user.ts

import { User } from '@prisma/client'

export const removeSensitiveData = (user: User) => {
  const { passwordHash, resetPasswordToken, ...userWithoutSensitiveData } = user
  return userWithoutSensitiveData
}
