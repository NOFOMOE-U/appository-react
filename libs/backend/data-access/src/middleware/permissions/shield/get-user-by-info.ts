import { MyContext } from '@appository/backend/context-system';
import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';


export const getUserInfo: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.request?.headers?['authorization']: undefined;
  if (!authorization) {
    return next();
  }

  try {
    const token = authorization[1];
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.userId = payload.userId;
  } catch (err) {
    console.log(err);
  }

  return next();
};
