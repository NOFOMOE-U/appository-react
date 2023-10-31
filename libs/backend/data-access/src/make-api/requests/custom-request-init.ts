import { ParsedQs } from "qs"
import { AppConfiguration } from "../../context/app-configuration"
import { CustomContextType } from "../../context/custom-context-type"
import { CustomSessionType } from "../my-custom-request"
import { YourRequestObject } from "./custom-request-with-context"

export interface CustomRequestInit extends RequestInit {
    url?: string
    query?: ParsedQs
    params?: { [key: string]: string }
    get?: (name: string) => string | null | undefined
    accepts: (types: string | string[]) => string[]
     customCache?: RequestCache
    session?: CustomSessionType
    body?: BodyInit | undefined
    signedCookies?: { [key: string]: string }
    context?: CustomContextType
    config?: AppConfiguration; 
    request: YourRequestObject<CustomRequestInit>
  }
  
  export interface CustomRequestInitWithGet extends CustomRequestInit {
    get?: (name: string) => string | null | undefined
  }
  