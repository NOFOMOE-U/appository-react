// src/utils/auth.ts
import { User } from '@prisma/client'
import { sign } from 'jsonwebtoken'

const generateToken = (user: User) => {
  const payload = {
    sub: user.id,
    email: user.email,
    roles: user.roles,
  }
  return sign(payload, process.env.JWT_SECRET!, { expiresIn: '15m' })
}

export default generateToken
