// user.input.ts
import {
  registerDecorator, ValidationArguments,
  ValidationOptions
} from 'class-validator'
import { UserRole } from 'libs/backend/data-access/src/node_modules/.prisma/client'
import { Field, InputType } from 'type-graphql'

// Custom validator function to validate the password and confirmPassword fields
function PasswordValidator(value: UserInput): boolean {
  const password = value.password
  const confirmPassword = value.confirmPassword
  return password === confirmPassword
}

// Custom class-validator decorator that utilizes the PasswordValidator function
export function MatchesPasswordConstraint(
  ValidationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'matchesPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: ValidationOptions,
      
     
      validator: {
        validate(value: any, args: ValidationArguments) {
          return PasswordValidator(value)
        },
      },
    })
  }
}

@InputType()
export class UserInput {
  @Field({ nullable: false })
  name: string

  @Field({ nullable: false })
  email: string

  @Field({ nullable: false })
  password: string

  @Field({ nullable: false })
  createdAt: Date

  @Field({ nullable: false })
  updatedAt: Date

  @Field({ nullable: false })
  confirmPassword: string

  @Field(() => [UserRole], { nullable: true })
  roles?: UserRole[];

  @Field(() => UserRole, { nullable: true })
  role?: UserRole;

  @MatchesPasswordConstraint({ message: 'Passwords do not match' })
  confirmPasswordMatch: boolean
}
