// designed to be used on the server side (backend)
import { PrismaClient } from '@prisma/client';
import { isEmail } from 'class-validator';
import { useState } from 'react';
import * as yup from 'yup';
import errorMessages from './error-messages';

const prisma = new PrismaClient();

const [errors, setErrors] = useState({});

const setError = (name: string, message: string) => {
  setErrors((prevState) => ({ ...prevState, [name]: message }));
};

// Asynchronous function to validate email uniqueness
const validateEmailUniqueness = async (prisma: PrismaClient, value: string, context: any) => {
  const user = await prisma.user.findUnique({ where: { email: value } });
  return !user;
};

export const validateRule = (rule: yup.TestFunction<any, any>) => async (
  value: any,
  context: yup.TestContext
) => {
  try {
    await rule.call(context, value, context);
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new yup.ValidationError(error.message);
    }
    throw error;
  }
};

// Yup schema for validation
const yupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .test('email', 'Invalid email address', (value) => isEmail(value))
    .test('emailUniqueness', 'Email is already registered', async (value, context) =>
      validateEmailUniqueness(prisma, value, context)
    ),
});

// Function to validate input
const validateInput = async () => {
  try {
    await yupSchema.validate(FormData, { abortEarly: false });
  } catch (error: unknown) {
    if (error instanceof Error) {
      setError('unknown', error.message);
    } else {
      errorMessages.unknownError;
    }
  }
};

// Synchronous function to validate email uniqueness
const validateEmailUniquenessSync = (prisma: PrismaClient) => (value?: string) => {
  // Check if the value is undefined or null
  if (value === undefined || value === null) {
    return false; // or handle accordingly based on your requirements
  }

  // Check if the email is already registered
  const user = prisma.user.findUnique({ where: { email: value } });
  return !user;
};


// Function to create Yup rule for email uniqueness
 const emailUniquenessRule = (prisma: PrismaClient) =>
  yup.string().test(
    'emailUniqueness',
    'Email is already registered',
    validateEmailUniquenessSync(prisma)
  );


// Function to validate user input using Yup
const validateUser = async (user: any, prisma: PrismaClient) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required()
      .test('emailUniqueness', 'Email is already registered', async (value, context) =>
        validateEmailUniqueness(prisma, value, context)
      ),
    password: yup
      .string()
      .required()
      .test('email', 'Invalid email address', (value) => isEmail(value))
      .test('emailUniqueness', 'Email is already registered', async (value, context) =>
        validateEmailUniqueness(prisma, value, context)
      ),
    // Add more validation rules for other fields if needed
  });

  await schema.validate(user, { abortEarly: false });
};

export { emailUniquenessRule, setError, validateUser, yupSchema };

module.exports = validateInput;
