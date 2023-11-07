import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { convertUserToUserWithAccessToken } from '../../interfaces/auth/authenticate';
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
  async findById(@Param('id') id: string): Promise<UserWithoutSensitiveData | null> {
    const user = await this.userService.getUserById(id)
    if (user) {
      return convertUserToUserWithAccessToken(user)
    }
    return null
  }

  @Get(':email')
  async findUserByEmail(
    @Param(new ValidationPipe({validateCustomDecorators: true}))email: string) {
    return this.userService.getUserByEmail(email);
  }

}
