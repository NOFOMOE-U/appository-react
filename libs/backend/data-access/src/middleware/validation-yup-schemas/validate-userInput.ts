import { PrismaClient } from '@prisma/client'
import { rule } from 'graphql-shield'
import * as yup from 'yup'
import { validateRule } from '../permissions/permissions'

const prisma = new PrismaClient()

const emailUniquenessRule: yup.TestFunction<string, any> = async (value: string) => {
  const user = await prisma.user.findUnique({ where: { email: value } })
  return !user
}

const validateUser = async ({ email, password }: { email: string; password: string }): Promise<boolean> => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required()
      .test('emailUniqueness', 'Email is already registered', validateRule(emailUniquenessRule)),
    password: yup
      .string()
      .required()
      .test('password', 'Password must be at least 8 characters long', (value) => value.length >= 8),
  })
  await schema.validate({ email, password })
  return true
}

const validateUserRule = rule()(async (parent, args, context: yup.TestContext) => {
  await validateRule(validateUser)(args, context)

  return true
})

export default validateUserRule
