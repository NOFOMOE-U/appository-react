import { PrismaClient, User } from '@prisma/client'
import { Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { createForPrisma, createForUser } from './casl-abilities'

const prisma = new PrismaClient()
const req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> = {} as Request<
  ParamsDictionary,
  any,
  any,
  ParsedQs,
  Record<string, any>
>
const user = {} as User
const accessLevel = 'free'
const abilityForUser = createForUser(user)
const abilityForPrisma = await createForPrisma(prisma, req, accessLevel)

export { abilityForPrisma, abilityForUser }




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

// import { PrismaClient } from '@prisma/client';
// import { createForPrisma, createForUser } from './caslAbilities';

// const prisma = new PrismaClient();
// const req: Request = {} as Request;
// const accessLevel = 'free';

// // Create abilities
// const user = {}; // Replace this with the actual user
// const abilityForUser = createForUser(user);
// const abilityForPrisma = await createForPrisma(prisma, req, accessLevel);

// export { abilityForUser, abilityForPrisma }; // Export the abilities
