import { PrismaClient } from '@prisma/client';
import yup from 'yup';


// Define a Yup validation rule for email uniqueness
const emailUniquenessRule = (prisma: PrismaClient) =>
  function (this: yup.TestContext) {
    // Get the value of the email field
    const value = this.parent.email
    // Check if the email is already registered
    return validateEmailUniqueness(prisma)(value, this)
  }

const validateEmailUniqueness = (prisma: PrismaClient) => async (value: string, context: any) => {
  const user = await context.prisma.user.findUnique({ where: { email: value } });
  return !user || context.createError({ message: 'Email is already registered' });
};