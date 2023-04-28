import { ExtendedCustomRequest, getHeaderValue } from '../interfaces/user/custom-request';
import { CustomRequestWithContext } from './custom-request-with-context';
import { MyContext } from './mycontext';

interface DefaultOptions {
  req: CustomRequestWithContext<MyContext<{}>>;
  headers?: Record<string, string>;
}

const defaultOptions = ({ req }: DefaultOptions): ExtendedCustomRequest<MyContext<{}>> => {
  // Retrieve host, referer, and origin from the request headers
  const headers: Record<string, string> = {};
  if (req.headers) {
    for(const[key,value] of Object.entries(req.headers)) {
      if (typeof value === 'string') {
        headers[key] = value;
      }
      if (Array.isArray(value)) {
        headers[key] = value.join(',');
      }
    };
  }

  const host = headers.host || '';
  const referer = headers.referer || '';
  const origin = headers.origin || '';

  // Retrieve accessToken from the request object
  const { accessToken } = req;

  // Determine if the request is an API request
  const isApiRequest = referer.includes(`${origin}/api/`);

  // Define the options object with the necessary headers
  const options: ExtendedCustomRequest<MyContext<{}>> = {
    // Spread the properties of the request object
    ...req,
    get: (name: string)=> getHeaderValue(req,name),
    headers: {
      // Spread the properties of headers object
      ...headers,
      // Add the x-poser-by header
      'x-powered-by': 'test-server',
      // Add the x-test-header header
      'x-test-header': 'true',
      // Add the access-control-allow-origin header
      'Access-Control-Allow-Origin': '*',
      // Add the authorization header
      Authorization: `Bearer ${accessToken || ''}`,
      // Add the content-type header
      'Content-Type': 'application/json',
      // Add the referer header if it is an API request
      ...(isApiRequest && { Referer: referer }),
      // Add the request-policy header if it is an API request
      ...(isApiRequest && { 'Referer-Policy': 'strict-origin-when-cross-origin' }),
      // Add the strict-transport-security header
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      // Add the x-content-type-options header
      'X-Content-Type-Options': 'nosniff',
      // Add x-frame-options header
      'X-Frame-Options': 'SAMEORIGIN',
      // Add the x-xss protection header
      'X-XSS-Protection': '1; mode=block',
    },
    signedCookies: req.signedCookies,
    currentUser: req.currentUser,
    context: req.context,
    cookies: {},
  };

  return options;
};

export default defaultOptions;
