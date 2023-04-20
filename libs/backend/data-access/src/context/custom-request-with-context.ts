import { PrismaClient, User } from "@prisma/client";
import { NextFunction, Response } from "express";
import { CustomRequest } from "../interfaces/user/custom-request";
import { createContext } from "./create-context";
import { CustomContextType } from "./custom-context-types";

export interface CustomRequestWithContext<T = {}> extends CustomRequest<T> {
  context: (T & {});
  user: { id: string };
  currentUser?: User | null;
  accessToken?: string;

  // cache: any;
  // credentials: any;
  // destination: any;
  // integrity: any;
  // variables: any,

  id: string;
  prisma: any
[key: string]: any; // allow any additional properties
}


// Middleware function to attach our custom context to the request object
export const attachCustomContext = (): ((req: CustomContextType, res: Response, next: NextFunction)=> void) => {
  return (req: CustomContextType, res: Response, next: NextFunction) => {
    const customProp = "example custom property";
    req.ctx = {
      ...req.ctx,
      customProp,
    };
    next();
  };
};



export function createCustomContextWithRequest(prisma: PrismaClient, contextType: CustomContextType) {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const context = await createContext(prisma, req);
    // setContextId(context, (req.headers as any)['x-request-id'] || '');
    context.customProp = 'updated custom property'
    req.context = context
    if (req.user){
      req.userId = req.user?.id?.toString() ?? undefined;
      next();
    }
  };
}
