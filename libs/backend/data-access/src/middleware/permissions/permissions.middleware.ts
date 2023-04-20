import { createParamDecorator, ExecutionContext, Injectable, NestMiddleware } from '@nestjs/common'
import { Context, GqlExecutionContext } from '@nestjs/graphql'
import { NextFunction } from 'express'
import { GraphQLResolveInfo } from 'graphql'
import { shield } from 'graphql-shield'
import { CustomRequestWithContext } from '../../context/custom-request-with-context'
import prisma from '../../lib/prisma/prisma'
import { CaslAbilityFactory } from '../user/userAbility/createPrismaAbillity'
import errorMessages from './error-messages'
import { PermissionsModuleOptions } from './permissions.types'
import { permissions } from './shield/shield-permissions'


export const Info = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  return ctx.getInfo()
})

//set up for shield permissions to be imported into types
export const permissionsMiddleware = shield(permissions, {
  debug: true,
  allowExternalErrors: true,
});

@Injectable()
export class PermissionsMiddleware implements NestMiddleware {
  constructor(private readonly options: PermissionsModuleOptions) {}

  async use(@Info() info: GraphQLResolveInfo, @Context() context: CustomRequestWithContext, next: NextFunction) {
    const ability = await CaslAbilityFactory.createForPrisma(prisma, context)

    const fieldPath = info.path
    const fieldTypeName = info.parentType.name
    const key = fieldPath.key.toString()
    const subjectName = key.charAt(0).toUpperCase() + key.slice(1)
    const action = fieldPath.typename?.toLowerCase() || ''

    if (action && subjectName) {
      if (!ability.can(action, subjectName)) {
        throw new Error(errorMessages.notAuthorized)
      }
    }

    if (fieldTypeName === 'Query' && !ability.can('read', 'all')) {
      if (fieldPath.key === 'me') {
        throw new Error(errorMessages.notAuthorized)
      }
      if (fieldPath.key === 'users') {
        if (!ability.can('read', 'User')) {
          throw new Error(errorMessages.notAuthorized)
        }
      }
    }
    next()
  }
}
