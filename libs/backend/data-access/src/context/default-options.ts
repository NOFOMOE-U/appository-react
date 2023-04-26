import { ExtendedCustomRequest } from './../interfaces/user/custom-request';
import { CustomRequestWithContext } from './custom-request-with-context';
import { MyContext } from './mycontext';

interface DefaultOptions {
  req: CustomRequestWithContext<MyContext<{}>>;
  headers?: Record<string, string | string[]>;

}

export const defaultOptions = ({ req}: DefaultOptions) => {
  // Retrieve host, referer, and origin from the request headers
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value as string;
  });
  
  const host = headers.host || '';
  const referer = headers.referer || '';
  const origin = headers.origin || '';

  // Retrieve accessToken from the request object
  const { accessToken } = req;

  // Determin if the request is an API request
  const isApiRequest = referer.includes(`${origin}/api/`);

  // Define the options object with the necessary headers
  const options: ExtendedCustomRequest<MyContext<{}>> = {
    //spread the properties of the request object
    ...req,
    get: (name: string) => {
      const value = headers[name]
      if (name === 'set-cookie') {
        return value ? [value]: undefined
      }
      return typeof value === 'string' ? value : undefined;
    },
    headers: {
      //spread the properties of headers object
      ...headers,
      // add the x-poser-by header
      'x-powered-by': 'test-server',
      // add the x-test-header header
      'x-test-header': 'true',
      // add the access-control-allow-origin header
      'Access-Control-Allow-Origin': '*',
      //add the authorization header
      Authorization: `Bearer ${accessToken || ''}`,
      //add the content-type header
      'Content-Type': 'application/json',
      // add the referer header if it is an API request
      ...(isApiRequest && { Referer: referer }),
      // add the request-policy header iif it is an API rrequest
      ...(isApiRequest && { 'Referer-Policy': 'strict-origin-when-cross-origin' }),
      // add the strict-transport-security header
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      // add the x-content-type-options header
      'X-Content-Type-Options': 'nosniff',
      //add x-frame-options header
      'X-Frame-Options': 'SAMEORIGIN',
      //add the x-xss protection header
      'X-XSS-Protection': '1; mode=block',
    },
    signedCookies: req.signedCokies, 
    cookies: {},
    currentUser: req.currentUser,
    context: req.context
  };

  return options;
};

export default defaultOptions;
