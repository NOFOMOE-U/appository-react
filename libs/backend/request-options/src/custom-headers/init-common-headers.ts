import { Socket } from "socket.io";
import { CustomContextHeaders } from "../custom-requests/custom-request-with-context";

export function initializeCommonHeaders(socket: Socket): CustomContextHeaders {
    return {
      // Define a common headers object with default headers
      'Strict-Transport-Security': '',
      'X-Content-Type-Options': '',
      'X-Frame-Options': '',
      'X-XSS-Protection': '',
      'x-powered-by': '',
      'x-test-header': '',
      'Access-Control-Allow-Origin': '',
      Authorization: '',
      'Content-Type': '',
      Referer: '',
      'Referer-Policy': '',
    } as CustomContextHeaders
  }