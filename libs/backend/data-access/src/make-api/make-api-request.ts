import axios from 'axios';
import { ExtendedCustomRequest } from '../interfaces/user/custom-request';
import defaultOptions from './default-options';

export async function makeApiRequest(req: any) {
  // Create an instance of ExtendedCustomRequest using defaultOptions
  const options: ExtendedCustomRequest = defaultOptions({ req: req }) as ExtendedCustomRequest
  
  // Use axios to make a GET request to the API endpoint
  const response = await axios.get('https://example.com/api/users', options);
  
  // Process the response data as needed
  console.log(response.data);
}
