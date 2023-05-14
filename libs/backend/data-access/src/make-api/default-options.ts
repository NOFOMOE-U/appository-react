import { MyContext } from '../context/my-context'
import { CustomRequestWithContext } from './custom-request-with-context'

// Import the ExtendedCustomRequest and AxiosRequestConfig types
import type { AxiosRequestConfig } from 'axios'

export interface DefaultOptions {
  req: CustomRequestWithContext<MyContext<{}>>
  headers?: Record<string, string>
}

// Define the function that returns the default options
const defaultOptions = ({ req }: DefaultOptions): AxiosRequestConfig => {
  // Retrieve host, referer, and origin from the request headers
  const headers: Record<string, string> = {}
  if (req.headers) {
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === 'string') {
        headers[key] = value
      }
      if (Array.isArray(value)) {
        headers[key] = value.join(',')
      }
    }
  }

  const host = headers.host || ''
  const referer = headers.referer || ''
  const origin = headers.origin || ''

  // Retrieve accessToken from the request object
  const { accessToken } = req

  // Determine if the request is an API request
  const isApiRequest = referer.includes(`${origin}/api/`)

  // Define the options object with the necessary headers
  const options: AxiosRequestConfig = {
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
    baseURL: process.env.API_URL,
    responseType: 'json',
  }

  return options
}

export default defaultOptions
