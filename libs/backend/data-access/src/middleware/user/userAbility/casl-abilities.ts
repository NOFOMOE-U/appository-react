import { AbilityBuilder, AbilityOptionsOf, ClaimRawRule, PureAbility } from '@casl/ability'
import { PrismaQuery, Subjects, createPrismaAbility } from '@casl/prisma'
import { Prisma, PrismaClient, User, UserRole, User as UserType } from '@prisma/client'
import { Request } from 'express'
import { getUserId } from '../../../utils/backend-auth.utils'
import { hasRole } from '../../permissions/rules/is-authenticated-user'


type SubjectRawRule = {
    subject: string
    actions: string[]
    condition?: Prisma.UserWhereInput
  }

  
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
  cannot: (actions: string[], subject: string, condition?: Prisma.UserWhereInput) => boolean
}



export const createForUser= async (user: User): Promise<AppAbility> => {
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


  export const createForPrisma = async (prisma: PrismaClient, req: Request, accessLevel: string): Promise<AppAbility> => {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility)
    can('read', 'Post')

    const user = await getUserId(req) // replace with actual user

    const baseRules = [
      can('manage', 'User', { id: user }),
      cannot('delete', 'User', { id: user }),
      can(['read', 'create'], 'Post'),
      can(['update', 'delete'], 'Post', { authorId: user }),
    ]

    const accessLevelString = Object.values(accessLevel).join(', ')
    const roles: UserRole[] = accessLevelString.split(',') as UserRole[]
    
    ////todo verify mapping is accurate to remove the additionalRules 
    //that isn't dynamic under it

    const additionalRules = accessLevelString
    ? roles.map((role) => hasRole(role))
    : [];


    // commented out code for each level

    // const additionalRules = accessLevel
    //   // how to set up rohasRolees for users to have specific permission
    //   ? // Rules for specific packages
    //     hasRole(accessLevel)
    //     ? [
    //         {
    //           subject: 'FreeResource',
    //           actions: ['read', 'create'],
    //           condition: { id: user },
    //         },
    //       ]
    //     : accessLevel === 'standard'
    //       ? [
        
    //         {
    //           subject: 'StandardResource',
    //           actions: ['read', 'create', 'update', 'delete'],
    //           condition: { id: user },
    //         },
    //       ]
    //     : accessLevel === 'premium'
    //     ? [
    //         {
    //           subject: 'PremiumResource',
    //           actions: ['read', 'create', 'update', 'delete'],
    //           condition: { id: user },
    //         },
    //       ]
    //     : []
    //   : []
    // const additionalRules = accessLevel ? [
    //       {
    //         subject: 'SpecialResource',
    //         actions: ['read', 'create', 'update', 'delete'],
    //         condition:{id: user}
    //       }
    //     ] :[]

    // Make allRules iterable by wrapping it in an array
    // const allRules: SubjectRawRule[] = [...baseRules, ...additionalRules];
    const allRules: PureAbility<[string, any], PrismaQuery | SubjectRawRule> = build([
      ...baseRules,
      ...additionalRules,
    ] as AbilityOptionsOf<AppAbility>)

    const ability: PureAbility<[string, any], PrismaQuery | SubjectRawRule> = createPrismaAbility(
      allRules as SubjectRawRule & ClaimRawRule<any>,
    )
    return createPrismaAbility(ability as SubjectRawRule & ClaimRawRule<any>) as AppAbility
  }