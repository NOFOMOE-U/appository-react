import { SessionData } from '../types/express'
import {CustomRequestInit, MyCustomRequest} from './my-custom-request'
import { Cookie } from 'tough-cookie'
import fetch, { Headers, RequestInit, Response } from 'node-fetch'
import { MyContext } from '../context/my-context'
import http from 'http'

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

async function makeRequest() {
  const request: MyCustomRequest<MyContext<MyContext>> = new MyCustomRequest({
    body: {
      request: {},
      context: {},
      session: SessionData,
      signedCookies: '',
      get: (name: string) => headers.get(name) || null,
    },
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'GET',
    headers: {},
    get: (name: string) => {
      if (name === 'set-cookie') {
        const value = headers.get(name)
        return value ? [...value.split(', ')] : undefined;
      }
      return headers.get(name) 
    },
    header: (name: string, value?: string | undefined
 | string[] | undefined) => {
      if (value) {
        headers.set(name, value)
      } 
      return headers.get(name)
    },
    accepts: (types: string | string[]) => true,
  })

  const headers = request.headers

  const response = await request.fetch()

  if (response.ok) {
    const data = await response.json()
    console.log('Response data:', data)
  } else {
    console.error('Error:', response.status, response.statusText)
  }
}

makeRequest()
// #todo ways to use tough cookie
// Web scraping: When scraping websites, it's common to send multiple requests to the same website over a period of time. By using Tough Cookie, you can ensure that the website doesn't block you due to repeated requests from the same IP address. You can set up a cookie jar to store cookies and send them with subsequent requests, mimicking a regular user's behavior.

// API authentication: If you're building an API that requires authentication, you can use Tough Cookie to manage authentication cookies. You can set up a cookie jar to store authentication cookies and send them with subsequent API requests to authenticate the user.

// E-commerce sites: E-commerce sites often require users to log in and keep track of their shopping cart. Using Tough Cookie, you can set up a cookie jar to store user session information and send it with subsequent requests. This ensures that users can seamlessly navigate the site without having to log in every time they browse a different page.

// Testing: When testing web applications, you may want to simulate different user scenarios. Using Tough Cookie, you can set up different cookie jars to simulate different user sessions. This allows you to test your application under different user conditions, which can help you identify and fix bugs.

// Crawling APIs: APIs often have rate limits and request quotas to prevent abuse. By using Tough Cookie, you can manage API authentication and track your API usage to stay within the limits. This can help prevent your application from getting blocked by the API provider for excessive usage.