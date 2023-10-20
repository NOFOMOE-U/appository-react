import { LoggingInterceptor, PrismaService } from '@appository/backend/data-access';
import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService
  ) { }

  @Get()
  getData() {
    return this.appService.getData()
  }

  @Get('hello')
  @UseInterceptors(LoggingInterceptor)
  async getHello(@Req() request: Request) {
    const context = await this.prismaService.getContext()
    const user = context.prisma.user
    return user
  }
}
