import { getDefaultAxiosOptions } from './default-options';
import { MyContext } from '@appository/backend/context-system';

  // merge the request and default contexts with the current context
  export function mergeContext(context: MyContext, request: any) {
      // create a new context object by copying the properties of the current context
      const mergedContext: any = { ...context };
    
      // if there is a request object, copy its properties into the new context object
      if (request) {
        for (const [key, value] of Object.entries(request.context)) {
          mergedContext[key] = value;
        }
      }
    
      // copy any properties from the default context that are not already in the new context object
      for (const [key, value] of Object.entries(getDefaultAxiosOptions)) {
        if (!mergedContext.hasOwnProperty(key)) {
          mergedContext[key] = value;
        }
      }
    
      return mergedContext;
  }
