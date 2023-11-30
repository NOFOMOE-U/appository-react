import * as yup from 'yup';
import { AuthDto } from '../auth/auth.dto';

const authSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});


const validateAuthData = async (data: AuthDto) => {
    try {
      await authSchema.validate(data, { abortEarly: false });
      // Data is valid
      return true;
    } catch (error) {
      // Validation failed
      return false;
    }
  };
  

  export { validateAuthData };
