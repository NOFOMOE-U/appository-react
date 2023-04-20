import { rule } from 'graphql-shield';
import { ShieldRule } from "graphql-shield/typings/types";

export const isNotAlreadyRegistered: ShieldRule = rule()(async (_parent, { email }, { ctx }) => {
    const user = await ctx.prisma.user.findUnique({ where: { email } })
    return !user
  })
  