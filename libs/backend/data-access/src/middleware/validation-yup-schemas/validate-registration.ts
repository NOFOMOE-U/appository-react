import yup from 'yup';

  
const userRegistrationSchema = yup.object().shape({
  username: yup.string().required().min(5),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

export default userRegistrationSchema;