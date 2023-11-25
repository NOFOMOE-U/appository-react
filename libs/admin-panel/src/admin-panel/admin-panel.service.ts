// admin.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getAdminData(): string {
    return 'Admin data from the service';
  }
}
