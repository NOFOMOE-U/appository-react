import { MyContext } from '../context/my-context'
import { UserService } from '../modules/user/user.service'
import { SessionData } from '../types/express'
import { MyCustomRequest } from './my-custom-request'

export interface ParsedUrl {
  protocol: string
  slashes: boolean
  auth: string | null
  host: string | null
  port: string | null
  hostname: string | null
  hash: string | null
  search: string | null
  query: string | null | { [key: string]: any }
  pathname: string | null
  path: string | null
  href: string
}
let userService: UserService
let requestBody: any;

  
export async function makeRequest(req: MyCustomRequest<MyContext<MyContext>>) {
  const sessionData = req.session as SessionData;
  const userId = sessionData.userId;
  
  const requestHeaders: Record<string, string | undefined> = {
    'Authorization' : `Bearer ${userId}`,
    'Content-Type' : 'application/json'
  };

  //.... populate requestHeaders ...

  // Convert requestHeaders to an array of two-item arrays
  const requestHeadersArray: [string, string][] = Object.entries(requestHeaders)
    .map(([key,value]) => [key,value || ""])

  for (const key in requestHeaders) {
    if (Object.prototype.hasOwnProperty.call(requestHeaders, key)) {
      const value = requestHeaders[key];
      requestHeadersArray.push([key,value || ''])
    }
  }
  
  requestBody = {
    body: undefined
  }
 
  const request: MyCustomRequest<MyContext<MyContext>> = new MyCustomRequest(
    requestBody,
    {
    body: undefined,
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'GET',
    headers: requestHeaders as HeadersInit,
    get: (name: string) => {
      const foundHeader = (requestHeaders as unknown as [string,string][])?.find(([key]: [string, string]) => key === name);
      if (foundHeader) {
        const value = foundHeader[1];
        return value ? value : undefined
      }
      return undefined
    },
    accepts: (types: string | string[]) => [],
    session: req.session
    },
    userService,
  )

  const response = await request.fetch();

  if (response.ok) {
    const data = await response.json();
    console.log('Response data:', data);
  } else {
    console.error('Error:', response.status, response.statusText);
  }
}


// #todo ways to use tough cookie
// Web scraping: When scraping websites, it's common to send multiple requests to the same website over a period of time. By using Tough Cookie, you can ensure that the website doesn't block you due to repeated requests from the same IP address. You can set up a cookie jar to store cookies and send them with subsequent requests, mimicking a regular user's behavior.

// API authentication: If you're building an API that requires authentication, you can use Tough Cookie to manage authentication cookies. You can set up a cookie jar to store authentication cookies and send them with subsequent API requests to authenticate the user.

// E-commerce sites: E-commerce sites often require users to log in and keep track of their shopping cart. Using Tough Cookie, you can set up a cookie jar to store user session information and send it with subsequent requests. This ensures that users can seamlessly navigate the site without having to log in every time they browse a different page.

// Testing: When testing web applications, you may want to simulate different user scenarios. Using Tough Cookie, you can set up different cookie jars to simulate different user sessions. This allows you to test your application under different user conditions, which can help you identify and fix bugs.

// Crawling APIs: APIs often have rate limits and request quotas to prevent abuse. By using Tough Cookie, you can manage API authentication and track your API usage to stay within the limits. This can help prevent your application from getting blocked by the API provider for excessive usage.



// todo
// Validation Middleware: Middleware for input validation and data sanitization. This can help ensure that the data being sent to your application is valid and safe to use.

// Logging Middleware: Middleware for logging requests and responses, which can be helpful for debugging and auditing purposes.

// Error Handling Middleware: Middleware for handling errors and returning standardized error responses to clients. This can make your API more user-friendly.

// CORS Middleware: Middleware for handling Cross-Origin Resource Sharing (CORS) to control which domains can access your API.

// Rate Limiting Middleware: Middleware for rate limiting requests to prevent abuse or excessive usage of your API.

// File Upload Middleware: If your application allows file uploads, you might need middleware to handle file uploads, validate file types, and save files to the server.

// Session Management Middleware: If your application uses sessions, middleware to handle session management and user state.

// Cache Middleware: Middleware to cache responses and reduce the load on your database or other services.