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
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character')
      .matches(
        /[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(
        /[\W_]/, 'Password must contain at least one special character'),
        
  })
  await schema.validate({ email, password })
  return true
}


const validatePasswordAsync = async (password: string): Promise<boolean> => {
  const schema = yup.object().shape({
    password: yup
      .string()
      .required()
      .min(8)
      .matches(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/),
  });

  try {
    await schema.validate({ password });
    return true;
  } catch (error) {
    return false;
  }
};

export { validatePasswordAsync }

validatePasswordAsync('');



const validateUserRule = rule()(async (parent, args, context: yup.TestContext) => {
  await validateRule(validateUser)(args, context)

  return true
})

export default validateUserRule
