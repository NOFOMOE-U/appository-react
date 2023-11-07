import yup from 'yup';

export const emailSchema = yup.string().required().matches(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  'Invalid email address'
);

export const isValid = await emailSchema.isValid('test@example.com'); // true
export const isValid2 = await emailSchema.isValid('invalid-email'); // false

