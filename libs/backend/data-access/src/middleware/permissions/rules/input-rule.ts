import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { rule } from 'graphql-shield';
import { IRuleConstructorOptions, ShieldRule } from 'graphql-shield/typings/types';
import * as yup from 'yup';
import { Schema } from 'yup';
import { UserRoleEnum } from '../../../modules/user/types';
import errorMessages from '../error-messages';

interface InputRuleFuncParams {
    _: any;
    args: Record<string, unknown>;
    ctx: { prisma: PrismaClient; request: Request };
    __: any;
}
  
function createRule(options: string | IRuleConstructorOptions = { cache: false }) {
  const defaultRuleOptions: IRuleConstructorOptions = { cache: false };
  const ruleOptions = typeof options === 'string' ? { name: options, ...defaultRuleOptions } : { ...defaultRuleOptions, ...options };
  // rest of the function
}

  
  export const inputRule = async (
    schema: Schema,
    options?: yup.ValidateOptions
  ): Promise<ShieldRule[]> => {
    const inputRuleFunc = async ({ _, args, ctx, __ }: InputRuleFuncParams) => {
      const userId = ctx.request.cookies['user-id']
      if (!userId) {
        throw new Error(errorMessages.notLoggedIn);
      }
      const user = ctx.prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error(errorMessages.userNotFound);
      }
      
      if (!Object.values(UserRoleEnum).includes(user)) {
        throw new Error(errorMessages.notAuthorized);
      }
      const validatedArgs = await schema.validate(args, options);
      Object.assign(args, validatedArgs);
      return true;
    };
    const inputRule = rule({ cache: 'contextual' })(inputRuleFunc);
    return [inputRule];
  };