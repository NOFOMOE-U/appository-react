import { AbilityBuilder, AbilityOptionsOf, ClaimRawRule, PureAbility } from '@casl/ability';
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
  > & {
    subjectName?: (params: any) => string
    can: (actions: string[], subject: string, conditions?: Prisma.UserWhereInput) => boolean
    cannot: (actions: string[], subject: string, condition?: Prisma.UserWhereInput)=> boolean
} 
  
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

  static async createForPrisma(prisma: PrismaClient, req: Request, accessTier: AccessTier): Promise<AppAbility> {
    const userAccessTier: AccessTier = req.body.user.accessTier // Get this from your user object

    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility)
    can('read', 'Post')

    const user = await getUserId(req) // replace with actual user

    const baseRules = [
      can('manage', 'User', { id: user }),
      cannot('delete', 'User', { id: user }),
      can(['read', 'create'], 'Post'),
      can(['update', 'delete'], 'Post', { authorId: user }),
    ]

    const additionalRules = accessTier
      ? [
          {
            subject: 'SpecialResource',
            actions: ['read', 'create', 'update', 'delete'],
            condition:{id: user}
          }
        ] :
      []
     
    // Make allRules iterable by wrapping it in an array
    // const allRules: SubjectRawRule[] = [...baseRules, ...additionalRules];
    const allRules: PureAbility<[string, any], PrismaQuery | SubjectRawRule> = build([...baseRules, ...additionalRules] as AbilityOptionsOf<AppAbility>);

    const ability: PureAbility<[string, any], PrismaQuery | SubjectRawRule> =  createPrismaAbility(allRules as SubjectRawRule & ClaimRawRule<any>);
    return createPrismaAbility(ability as SubjectRawRule & ClaimRawRule<any>)  as AppAbility;
  }
}

const prisma = new PrismaClient()
const req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> = {} as Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;
const accessTier: AccessTier = AccessTier.PREMIUM;
const ability =  await CaslAbilityFactory.createForPrisma(prisma, req, accessTier)

export default ability



// todo:
// The error message you're encountering indicates a mismatch in the properties of the AppAbility type. Specifically, it's missing properties from SubjectRawRule<string, any, PrismaQuery | SubjectRawRule>[].

// In order to address this error, it might be necessary to revisit and potentially extend the RuleBuilder class or the AbilityOptionsOf type. Here are the steps you might consider taking to resolve the issue:

// Steps to Address the Error:
// 1. Update RuleBuilder Class:
// In the RuleBuilder class, ensure that the rules being created align with the expected properties of SubjectRawRule<string, any, PrismaQuery | SubjectRawRule>[].

// Check the rules being constructed within the AbilityBuilder to ensure they contain necessary properties such as length, pop, push, and others.

// 2. Check AbilityOptionsOf:
// Verify the AbilityOptionsOf type. Make sure it adequately represents the required properties expected by the AppAbility type. This might include length, pop, push, and other missing properties from the SubjectRawRule.

// 3. Update AppAbility:
// Ensure that the AppAbility type includes all the properties expected from SubjectRawRule. You might need to extend the AppAbility type to match the properties or structure required by SubjectRawRule<string, any, PrismaQuery | SubjectRawRule>[].

// Consider comparing the AppAbility type with the properties of SubjectRawRule to identify missing fields.

// By carefully aligning these elements, you can resolve the error concerning missing properties in AppAbility. Make sure the types used in the RuleBuilder, AbilityOptionsOf, and AppAbility are coherent and match the expected structure of SubjectRawRule<string, any, PrismaQuery | SubjectRawRule>[].
 