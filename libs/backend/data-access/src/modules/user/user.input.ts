// user.input.ts
import { UserRole } from 'libs/backend/data-access/src/node_modules/.prisma/client';
import { Field, GraphQLISODateTime, ID, InputType } from 'type-graphql';

@InputType()
export class UserInput {
  @Field(() => ID)
    id: string
  @Field({nullable: false})
  name: string

  @Field({nullable: false})
  email: string

  @Field({nullable: false})
  password: string

  @Field(() => UserRole)
  role: UserRole

  @Field(() => GraphQLISODateTime, {nullable: false})
  createdAt: Date

  @Field(() => GraphQLISODateTime, {nullable: false})
  updatedAt: Date
}
