import { Controller, Get, Param } from '@nestjs/common';
import { UserWithoutSensitiveData } from './user';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async findAll(): Promise<UserWithoutSensitiveData[]> {
    return this.userService.getAllUsers()
  }

  @Get(':id')
  async findById(@Param('id') id: string):Promise<UserWithoutSensitiveData | null> {
    return this.userService.getUserById(id)
  }

  // @Get(':email')
  // async findByEmail(@Param('email') email: string) {
  //   return this.userService.getUserByEmail(email)
  // }
  //  If you are using it as part of a database query or performing any validation, it may be a good idea to use these decorators to ensure that the email is a valid string and is not empty.
  // use this example
  // @Get(':email')
  // async findByEmail(@Param('email', new ValidationPipe()) @IsString() @IsNotEmpty() email: string) {
  //   return this.userService.getUserByEmail(email);
  // }
}
