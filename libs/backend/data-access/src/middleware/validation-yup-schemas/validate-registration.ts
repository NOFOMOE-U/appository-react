import yup from 'yup';

const userRegistrationSchema = yup.object().shape({
  username: yup.string().required().min(5),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required('Password is required')
    .matches(
    // Regular expression for complex passwords
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
    'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number'
  ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Password must match'),
});

export default userRegistrationSchema;