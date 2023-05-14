// import { ExtendedCustomRequestWithPrisma, HeadersWithIndexSignature } from '../context/create-nested-context'
// import { Response } from 'node-fetch'
import { Cookie } from 'tough-cookie'
import { mergeContext } from '../utils/merge-options.utils'
import { CustomRequestSessionHeaders, CustomRequestWithSession, SharedHeaders } from './custom-request-with-session'
import { ParsedUrl } from './log-http-response'
import { SessionData } from '../types/express'
import { CustomHeaders, HeadersWithIndexSignature } from '../context/create-nested-context'

export interface CustomRequestInit extends RequestInit {
  url?: string;
}

export interface CustomRequestInitWithGet extends CustomRequestInit {
  get: (name: string) => string
  | string[]
  | null
  | undefined;
}

export interface MyHeaders extends SharedHeaders {
  // [key: string]: string | string[] | undefined;
  [key: string]
  : string
  | string[]
  | undefined
  | ((name: string, value: string) => void)
  set(name: string, value: string): this;
  // forEach(callbackFn: (value: string, name: string, headers: MyHeaders) => void, thisArg?: any): void;

}

// type MyHeaders = Record<string, string> & {
//   [key:string]: string
// } & {
//   set(name: string, value: string): void;
//   forEach(callbackFn: (value: string, name: string, headers: MyHeaders) => void, thisArg?: any): void;
  
// }

export class HeaderClass implements MyHeaders {
  [key: string]: string
  | ((name: string, value: string) => void);

  constructor(headers: { [key: string]: string }) {
    Object.keys(headers).forEach((key) => {
      this[key] = headers[key];
    });
  }

  forEach(callbackFn: (value: string, name: string, headers: MyHeaders) => void, thisArg?: any): void {
    Object.keys(this).forEach((key) => {
      if (this[key] !== undefined) {
        callbackFn(this[key] as string, key, this);
      }
    });
  }

  set(name: string, value: string): void {
    this[name] = value;
  }




  append(name: string, value: string): void {
    if(this[name]) {
    if (Array.isArray(this[name])) {
      this[name]?.push(value)
    }
      this[name]= [this[name] as string, value]
    }
    this[name] = value
  }

  get(name: string): string | null {
    return this[name] || null;
  }

  keys(): string[] {
    return Object.keys(this);
  }

  entries(): [string, string][] {
    return Object.entries(this) as [string, string][];
  }

  values(): string[] {
    return Object.values(this) as string[];
  }
}


export class MyCustomRequest<MyContext> implements CustomRequestWithSession<MyContext> {

  session: SessionData & { userId: string } = { userId: '' }
  context?: any = {}
  headers: CustomHeaders & CustomRequestSessionHeaders;
    
  ctx: {
    context: {},
    rawHeaders: string[] & readonly string[],
    headers: HeadersWithIndexSignature
    getAll: (name: string)=> undefined
  } = { context: {}, rawHeaders: [], headers: {}, getAll:()=> undefined}
  cookies: Record<string, string> = {}
  signedCookies: Record<string, string> = {}
  cache?: {}
  // destination?: string
  // integrity?: string
  accessToken?: string
  body: MyContext
  method: string
  url: string

  
  constructor(options: CustomRequestInit & { body?: MyContext }, request?: CustomRequestWithSession<MyContext>) {

    const headers: Headers = new Headers(options.headers || {})
    const headerEntries: [string, string | string[]] []=[];
    headers.forEach((value, key) => {
      headerEntries.push([key,value])
    })
    this.headers = new HeaderClass(options.headers);

    if (request && request.context && request.body) {
      //set session if available in the incoming request
      this.session = request.session
      
      //set context if availablle in the incoming request
      this.context = mergeContext(this.context, request)
      
      //set cookies and signeddCookies if avialble in the incoming request
      this.cookies = request.cookies
      this.signedCookies = request.signedCookies

      
      // set headers, url, method, and body from the incoming request
      this.headers = request.headers
      this.body = options.body || {} as MyContext
      this.url = request.url
      this.method = request.method
      this.cache = request.cache
      // this.destination = request.destination
      // this.integrity = request.integrity
      this.ctx = request.ctx
      this.accessToken = request.accessToken || undefined
      // this.id = ''
      // this.prisma = {}
      // this.token = ''
      // this.req = request.req
      Object.assign(this.headers = new Headers(request.headers || {}), init.headers)
      this.url = request.url

    } else {
        // set headers, url, method, and body from the options if not set from the incoming request
  this.headers = new Headers(options.headers)
  this.url = options.url
  this.method = options.method || 'GET'
  this.body = options.body

      // const parsedUrl: ParsedUrl= new URL(init.url!)
      // this.url = init.url!
      // this.method = init.method || 'GET'
      // this.headers = new Headers(init.headers)
      // this.id = ''
      // this.prisma = {}
      // this.token = ''
      this.get = (name: string) => {
        if (name === 'set-cookie') {
          const value = this.headers.get(name)
          return value ? [...value.split(', ')] : undefined;
        }
        return this.headers.get(name)
      }

      
      this.header = (name: string, value?: string | string[] | undefined) => {
        if (value) {
          if (name === 'set-cookie') {
            if (typeof value === 'string') {
              value = [value]
            }
            const cookies = value.map((v) => Cookie.parse(v))
            this.headers.set(name, cookies.map((cookie) => cookie?.toString()))
          } else {
            if (typeof value === 'string') {
              this.headers.set(name, value)
            } else {
              this.headers.set(name, value.join(', '))
            }
          }
        }
        return this.headers.get(name)
      }

      this.accepts = (types: string | string[]) => {
        const accept = this.headers.get('accept')
        if (!accept || accept === '*/*') {
          return true
        }
        if (typeof types === 'string') {
          types = [types]
        }
        return types.some((type) => accept.includes(type))
      }
    },
    
  }
  async fetch(): Promise<Response> {
    const fetchOptions = {
      method: this.method,
      headers: this.headers,
      body: this.body ? JSON.stringify(this.body)
      
    }
  },
  get:
    (name: string) => string | string[] | undefined;

  header: (name: string, value?: string | string[] | undefined) => string | string[] | undefined = (name: string, value?: string | string[] | undefined) => {
    if (value) {
      if (name === 'set-cookie') {
        if (typeof value === 'string') {
          value = [value]
        }
        const cookies = value.map((v) => Cookie.parse(v))
        this.headers.set(name, cookies.map((cookie) => cookie?.toString()))
      } else {
        if (typeof value === 'string') {
          this.headers.set(name, value)
        } else {
          this.headers.set(name, value.join(', '))
        }
      }
    }
    return this.headers.get(name)
  }
  
  accepts: (types: string | string[]) => boolean = (types: string | string[]) => {
    const accept = this.headers.get('accept')
    if (!accept || accept === '*/*') {
      return true
    }
    if (typeof types === 'string') {
      types = [types]
    }
    return types.some((type) => accept.includes(type))
  }
  
  acceptsEncodings: (encodings: string | string[]) => string | false = (encodings: string | string[]) => {
    const acceptEncoding = this.headers.get('accept-encoding')
    if (!acceptEncoding || acceptEncoding === '*') {
      return encodings[0]
    }
    if (typeof encodings === 'string') {
      encodings = [encodings]
    }
    for (let i = 0; i < encodings.length; i++) {
      if (acceptEncoding.includes(encodings[i])) {
        return encodings[i]
      }
    }
    return false
  }
  
  acceptsCharsets: (charsets: string | string[]) => string | false = (charsets: string | string[]) => {
    const acceptCharset = this.headers.get('accept-charset')
    if (!acceptCharset || acceptCharset === '*') {
      return charsets[0]
    }
    if (typeof charsets === 'string') {
      charsets = [charsets]
    }
    for (let i = 0; i < charsets.length; i++) {
      if (acceptCharset.includes(charsets[i])) {
        return charsets[i]
      }
    }
    return false
  }
  
  acceptsLanguages: (langs: string | string[]) => string | false = (langs: string | string[]) => {
    const acceptLanguage = this.headers.get('accept-language')
    if (!acceptLanguage || acceptLanguage === '*') {
      return langs[0]
    }
    if (typeof langs === 'string') {
      langs = [langs]
    }
    for (let i = 0; i < langs.length; i++) {
      if (acceptLanguage.includes(langs[i])) {
        return langs[i]
      }
    }
    return false
  }
  

  // #todo
//   redirect: (url: string, status?: number) => void = (url: string, status?: number) => {
//     this.headers.set('location', url)
//     if (status) {
//       this.status = status
//     } else {
//       this.status = 302
//     }
//     this.body = `Redirecting to ${url}`
//   }
  
//   set: (field: string, val: string | string[]) => void = (field: string,
//     val: string | string[]) => {
//       if (field === 'set-cookie') {
//       if (typeof val === 'string') {
//       val = [val]
//       }
//       const cookies = val.map((v) => Cookie.parse(v))
//       this.headers.set(field, cookies.map((cookie) => cookie.toString()))
//       } else {
//       this.headers.set(field, Array.isArray(val) ? val.join(', ') : val)
//       }
//       }  

//   /**
  
//   Get the value of a header.
//   @param name - The name of the header.
//   @returns The value of the header, or undefined if the header is not present.
//   */
//   getHeader(name: string): string | string[] | undefined {
//     return this.headers.get(name)
//   }
//   /**
  
//   Set the value of a header.
//   @param name - The name of the header.
//   @param value - The value of the header.
//   @returns The value of the header.
//   */
// setHeader(name: string, value: string | string[] | null): string | string[] | undefined {
//     if (name === 'set-cookie') {
//       if (typeof value === 'string') {
//         value = [value]
//       }
//       const cookies = value.map((v) => Cookie.parse(v)) 
//       this.headers.set(name, cookies.map((cookie) => cookie.toString()))
//     } else {
//       if (typeof value === 'string') {
//         this.headers.set(name, value)
//       } else {
//         this.headers.set(name, value.join(', '))
//       }
//     }
//     return this.headers.get(name)
//   }
//   /**
  
//   Check if the request accepts the given content type.
//   @param types - The content types to check.
//   @returns true if the request accepts the content type, false otherwise.
//   /
//   accepts(types: string | string[]): boolean {
//   const accept = this.headers.get('accept')
//   if (!accept || accept === '/*') {
//   return true
//   }
//   if (typeof types === 'string') {
//   types = [types]
//   }
//   return types.some((type) => accept.includes(type))
//   }
//   /**
  
//   Get the remote address of the client making the request.
//   @returns The remote address of the client making the request, or undefined if it cannot be determined.
//   */
//   getRemoteAddress(): string | undefined {
//     return this.req ? this.req.socket.remoteAddress : undefined
//   }
//   /**
  
//   Get the session associated with the request.
//   @returns The session associated with the request, or undefined if no session exists.
//   */
//   getSession(): Session | undefined {
//     return this.ctx?.session
//   }
//   /**
  
//   Set the session associated with the request.
//   @param session - The session to associate with the request.
//   */
//   setSession(session: Session): void {
//     if (this.ctx) {
//       this.ctx.session = session
//     }
//   }
//   /**
  
//   Get the current user making the request.
//   @returns The current user making the request, or undefined if no user is logged in.
//   */
//   getUser(): User | undefined {
//     return this.ctx?.user
//   }
//   /**
  
//   Set the current user making the request.
//   @param user - The user to associate with the request.
//   */
//   setUser(user: User):

}











// main.js
// lines 19-21
//create more data attributes to select 
// const modalOpen = '[data-open]';
// const modalClose = '[data-close]';
// const isVisible = 'is-visible'






// [data-animation="zoomInOut"].full-screen-modal{
//   transform: scale(.2)
// }

// [data-animation="zoomInOut"].full-screen-modal.is-visible{
//   transform: none;
// }

// animations
// /
// [data-animation="zoomInOut"].full-screen-modal{
//     transform: scale(.2)
// }

// [data-animation="zoomInOut"].full-screen-modal.is-visible{
//     transform: none;
// }