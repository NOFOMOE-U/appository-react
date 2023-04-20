import { Controller, ForbiddenException, Get, Query } from '@nestjs/common';
import { PermissionsService } from '../../middleware/permissions/permissions.service';
import { UserService } from '../user/user.service';
import { TaskService } from './task.service';
@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TaskService,
    private permissionsService: PermissionsService,
    private userService: UserService,
  ) {}

  @Get()
  async getTasks(@Query() query: { userId: string; taskId: number; projectMembers: string[] }): Promise<any> {
    const { userId, taskId, projectMembers } = query

    // Check if the user has permission to view the project
    if (!this.permissionsService.canViewProject(userId, projectMembers)) {
      throw new ForbiddenException('You are not a member of this project')
    }

    // Check if the user has permission to reassign the task
    const user = await this.userService.getUserById(userId)
    // Get the task details
    const task = await this.taskService.getTaskById(taskId.toString())
    if (!user || !task || !this.permissionsService.canReassignTask(user, task)) {
      throw new ForbiddenException('You do not have permission to reassign this task')
    }
    //can update 
    if (!user || !task || !this.permissionsService.canUpdateTask(user, task)) {
      throw new ForbiddenException('You do not have permission to update this task')
    }
    return task
  }
}
