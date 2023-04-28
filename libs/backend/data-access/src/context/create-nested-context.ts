import { CustomRequestWithContext } from './custom-request-with-context'
import { MyContext } from './mycontext'

export function createNestedContext<T>(outerContext: MyContext<T>): MyContext<MyContext<T>> {
  return {
    ...outerContext,
    req: outerContext.req as CustomRequestWithContext<MyContext<MyContext<T>>>,
    cookies: {},
    token: '',
    accessToken: '',
    request: outerContext.req as CustomRequestWithContext<MyContext<MyContext<T>>>,
    userId: outerContext.userId
      ? outerContext.userId
      : '0'
        
  }
}
