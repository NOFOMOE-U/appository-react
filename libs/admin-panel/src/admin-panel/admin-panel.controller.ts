// admin.controller.ts

import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin-panel.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getAdminData(): string {
    return this.adminService.getAdminData();
  }
}
