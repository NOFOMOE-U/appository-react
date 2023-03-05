import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'libs/backend/data-access/src/node_modules/.prisma/client';
import { User as UserType } from './types';
import { UserInput } from './user.input';
import { UserService } from './user.service';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [UserType])
  async users(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Query(() => UserType)
  async user(@Args('id') id: number): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Mutation(() => UserType)
  async createUser(@Args('data') data: UserInput): Promise<User> {
    return this.userService.createUser(data);
  }

  @Mutation(() => UserType)
  async updateUser(@Args('id') id: number, @Args('data') data: UserInput): Promise<User | null> {
    return this.userService.updateUser(id,data)
  }

  @Mutation(() => UserType)
  async deleteUser(@Args('id') id: number): Promise<User> {
    return this.userService.deleteUser(id)
  }
}




// import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { User as PrismaUser } from 'libs/backend/data-access/src/node_modules/.prisma/client';
// import { BackendDataAccessService } from '../../backenddataaccess/backenddataaccess.service';
// import { User } from './types';
// import { UserInput } from './user.input';
// import { UserService } from './user.service';
// @Resolver()
// export class UserResolver {
//   constructor(
//     private readonly userService: UserService,
//     private readonly data: BackendDataAccessService) { }

//   @Query(() => [User])
//   async users(): Promise<PrismaUser[]> {
//     return this.data.getAllUsers();
//   }

//   @Query(() => User)
//   async user(@Args('id') id: string): Promise<PrismaUser> {
//     return this.data.getUserById(id);
//   }

//   @Mutation(() => User)
//   async createUser(@Args('data') data: UserInput): Promise<PrismaUser> {
//     return this.data.createUser(data);
//   }

//   @Mutation(() => User)
//   async updateUser(@Args('id') id: string, @Args('data') data: UserInput): Promise<PrismaUser> {
//     return this.data.updateUser(id, data);
//   }

//   @Mutation(() => User)
//   async deleteUser(@Args('id') id: string): Promise<PrismaUser> {
//     return this.data.deleteUser(id);
//   }
// }
