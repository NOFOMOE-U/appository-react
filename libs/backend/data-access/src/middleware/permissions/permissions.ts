//designed to be used on server side(backend)
import { PrismaClient } from '@prisma/client'
import { isEmail } from 'class-validator'
import { useState } from 'react'
import * as yup from 'yup'
import errorMessages from './error-messages'

const prisma = new PrismaClient()

const [errors, setErrors] = useState({})

const setError = (name: string, message: string) => {
  setErrors(prevState => ({...prevState, [name]: message}))
}
// Define a Yup validation rule for email uniqueness
const emailUniquenessRule = (prisma: PrismaClient) =>
  function (this: yup.TestContext) {
    // Get the value of the email field
    const value = this.parent.email
    // Check if the email is already registered
    return validateEmailUniqueness(prisma)(value, this)
  }

const validateEmailUniqueness = (prisma: PrismaClient) => async (value: string, context: any) => {
  const user = await context.prisma.user.findUnique({ where: { email: value } })
  return !user || context.createError(errorMessages.emaillNotUnique)
}

export const validateRule = (rule: yup.TestFunction<any,any>) => async (value: any, context: yup.TestContext) => {
  try {
    await rule.call(context, value, context)
    return true
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new yup.ValidationError(error.message)
    }
    throw error
  }
}


const yupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .test('email', 'Invalid email address', (value) => isEmail(value))
    .test('emailUniqueness', 'Email is already registered', emailUniquenessRule(prisma)),
})

const validateInput = async () => {
  try {
    await yupSchema.validate(FormData, { abortEarly: false })
  } catch (error: unknown) {
    if (error instanceof Error) {
      setError('unknown',error.message)
    } else {
      errorMessages.unknownError
    }
  }
}

module.exports = validateInput
