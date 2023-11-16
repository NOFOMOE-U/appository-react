import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
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

  @Post('register')
  async register(@Body(new ValidationPipe({ validateCustomDecorators: true })) userData: any) {
    try {
      // Validate the user registration data
      // You can use the userData to create a new user or perform other registration logic
      const newUser = await this.userService.validateUserSchema(userData);
      return {
        message: 'User registered successfully',
        user: convertUserToUserWithAccessToken(newUser),
      };
    } catch (error) {
      return {
        error: 'Failed to register user',
      };
    }
  }
}

}
