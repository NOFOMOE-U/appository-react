import { AbilityBuilder, PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects, createPrismaAbility } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User, User as UserType } from '@prisma/client';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { getUserId } from '../../../utils/backend-auth.utils';

type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: UserType
      Post: any
    }>,
  ],
  PrismaQuery | SubjectRawRule
> & { subjectName: (params: any) => string }

type SubjectRawRule = {
  subject: string
  actions: string[]
  condition?: Prisma.UserWhereInput
}

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility)

    can(['read'], ['Post'])
    if (user) {
      can('manage', 'User', { id: user.id })
      cannot('delete', 'User', { id: user.id })

      can(['read', 'create'], 'Post')
      can(['update', 'delete'], 'Post', { authorId: user.id })
    }

    return build()
  }

  static async createForPrisma(prisma: PrismaClient, req: Request): Promise<AppAbility>{
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility)
      
    const user = await getUserId(req) // replace with actual user
    
    can('read', 'Post')
    can('manage', 'User', { id: user })
    cannot('delete', 'User', { id: user })
    can(['read', 'create'], 'Post')
    can(['update', 'delete'], 'Post', { authorId: user })

    return build()
  }
}

const prisma = new PrismaClient()
const req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> = {} as Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;
const ability =  CaslAbilityFactory.createForPrisma(prisma, req)

export default ability
