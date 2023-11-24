// user.input.ts
import { UserRole } from '@appository/backend/data-access';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { Field, InputType } from 'type-graphql';

// Custom validator function to validate the password and confirmPassword fields
function PasswordValidator(value: UserInput): boolean {
  const password = value.password
  const confirmPassword = value.confirmPassword
  return password === confirmPassword
}

// Custom class-validator decorator that utilizes the PasswordValidator function
export function MatchesPasswordConstraint(ValidationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
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
  name = ''

  @Field({ nullable: false })
  email = ''

  @Field({ nullable: false })
  password = ''

  @Field({ nullable: false })
  createdAt: Date = new Date()

  @Field({ nullable: false })
  updatedAt: Date = new Date()

  @Field({ nullable: false })
  confirmPassword = ''

  @Field(() => [UserRole], { nullable: true })
  roles?: UserRole

  @Field({nullable: false})


  @Field(() => UserRole, { nullable: true })
  role?: UserRole

  @MatchesPasswordConstraint({ message: 'Passwords do not match' })
  confirmPasswordMatch = false

  constructor(init?: Partial<UserInput>) {
    Object.assign(this, init);
  }
}