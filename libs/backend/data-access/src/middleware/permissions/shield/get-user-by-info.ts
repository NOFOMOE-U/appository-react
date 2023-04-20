import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../../../context/mycontext';

export const getUserInfo: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.request.headers['authorization'];
  if (!authorization) {
    return next();
  }

  try {
    const token = authorization.split(' ')[1];
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.userId = payload.userId;
  } catch (err) {
    console.log(err);
  }

  return next();
};
