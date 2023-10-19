import axios from 'axios';
import { MyContext } from '../context/my-context';
import { ExtendedCustomRequest } from '../interfaces/user/custom-request';
import { CustomRequestWithContext } from './custom-request-with-context';
import { getDefaultAxiosOptions } from './default-options';

export async function makeApiRequest(req: CustomRequestWithContext<MyContext<{}>>) {
  // Create an instance of ExtendedCustomRequest using defaultOptions
  const options = getDefaultAxiosOptions(req) as unknown as ExtendedCustomRequest;
  

  try {
    
    // Use axios to make a GET request to the API endpoint
    const response = await axios.get('https://example.com/api/users', options);
    
    // Process the response data as needed
    console.log(response.data);
  } catch (error) {
    console.log('Request Error: ',error)
  }
}



// For the error "Type '{ [key: string]: string | string[] | undefined; ... }' is not assignable to type '{ [key: string]: string; }'," it appears to be related to your headers object. Make sure that your commonHeaders and other header values are always of type string. If they can be undefined, you should check and handle that accordingly.