  import { SessionData } from 'express-session';
import { ExtendedCustomRequest } from '../interfaces/user/custom-request';
import { HeadersWithIndexSignature } from './create-nested-context';

  export interface CustomRequestCommon {
    req: {
      readonly session: SessionData;
      readonly cache: {};
      readonly context: {};
      get: (name: string) => undefined;
      cookies: any;
      signedCookies: any;
      // Add any other properties that are common
    };  
  }


  // /tasks/update that allows users to update the status of their tasks. 
  //For this endpoint, we might use CustomRequestWithMutableHeaders, 
  //since we need to modify the headers of the incoming request to add 
  // an authentication token and set the content type to JSON.We also need to 
  //access the session data to verify that the user has permission to update the task.
  export interface CustomRequestWithMutableHeaders extends CustomRequestCommon {
      req: {
          readonly session: SessionData & { userId: string };
          readonly cache: {};
          readonly context: {};
          readonly cookies: any
          readonly signedCookies: any
          get: (name: string) => undefined;
        rawHeaders: string[] & readonly string[];
        headers: HeadersWithIndexSignature;
        ctx: {
          readonly context: {};
          readonly rawHeaders: string[] & readonly string[];
          readonly headers: HeadersWithIndexSignature;
          readonly getAll: (name: string) => undefined;

          // Add any other properties that are specific to this option
        };
        req: ExtendedCustomRequest['req'];

        // Add any other properties that are specific to this option
      };
    }



  // used for propeties such as 
  //tasks that returns all the tasks for a user. 
  //For this endpoint, 
  //use CustomRequestWithReadonlyHeaders
  // since we only need to read the headers of the incoming request 
  //to authenticate the user and retrieve the tasks from the database.
  //We don't need to modify any of the headers.
  export interface CustomRequestWithReadonlyHeaders extends CustomRequestCommon {
      req: {
        
          readonly cache: {};
          readonly context: {};
          readonly session: SessionData & {userId: string};
          readonly cookies: any;
          readonly signedCookies: any;
          get: (name: string) => undefined;
      rawHeaders: readonly string[];
      headers: HeadersWithIndexSignature;
      ctx: {
        readonly context: {};
        readonly rawHeaders: readonly string[];
        readonly headers: HeadersWithIndexSignature;
        readonly getAll: (name: string) => undefined;
        
        // Add any other properties that are specific to this option
      };
      // req: ExtendedCustomRequest['req'];

      // Add any other properties that are specific to this option
    };
  }

