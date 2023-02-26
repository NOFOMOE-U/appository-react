import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { makeSchema } from 'nexus'
import * as path from 'path'
import { PrismaService } from '@appository/backend/data-access'
export interface Context {
  prisma: PrismaService
  req: any
}
const schema = makeSchema({
    types: [],
    outputs: {
      schema: path.join(process.cwd(), 'schema.graphql'),
      typegen: path.join(process.cwd(), 'generated/nexus.ts'),
    },
    contextType: {
      module: path.join(process.cwd(), 'app/gql.context.ts'),
      export: 'Context',
    },
});
  
export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  return ctx.getContext<Context>().req.user
})
