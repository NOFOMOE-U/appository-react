// user-behavior.controller.ts
import { Body, Controller, Post } from '@nestjs/common';

@Controller('user-behavior')
export class UserBehaviorController {
  @Post()
  trackUserBehavior(@Body() data: any) {
    // Handle and log user behavior data here
    console.log('Received user behavior data:', data);
    // You can process and store this data in your application as needed
  }
}
