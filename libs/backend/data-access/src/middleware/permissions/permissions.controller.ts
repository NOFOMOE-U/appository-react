import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { createPermissions } from './create-permissions';
import { PermissionsService } from './permissions.service';
@Controller('permissions')
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @Get()
  @UseGuards(createPermissions)
  async getPermissions(@Query() query: { userId: string; resourceType: string; resourceId: string }): Promise<any> {
    const { userId, resourceType, resourceId } = query
    const result = await this.permissionsService.getPermissions(userId, resourceType, resourceId)
    return result
  }

}
