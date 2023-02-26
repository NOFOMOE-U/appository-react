import { Controller, Get, Param } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.userService.findById(id)
  }

  // Add more routes as needed
}
