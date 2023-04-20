//Users/dixiejones/Development/main-app/appository-react/libs/backend/data-access/src/modules/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { Prisma, Task, TaskStatus } from '@prisma/client';
import { PrismaService } from '../../lib/prisma/prisma.service'; //added because of dev/graphql
import { createTask, deleteTask, getAllTasks, updateTask } from './tasks';

import { ContextService } from '@appository/backend/data-access';
import prisma from '../../../dist/libs/backend/data-access/src/lib/prisma/prisma';
@Injectable()
export class TaskService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly contextService: ContextService
  ) { }

  private readonly users: Task[] = [
    {
      id: '1',
      title: 'Task title here',
      description: 'this is where you add your task description',
      status: TaskStatus.OPEN,
      creatorId: '0',
      dueDate: new Date(),
      updatedAt: new Date(),
      completed: false,
      assignedToId: '',
      assigneeId: '',
      assignerId: '',
      teamId: '',
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Update Backend Authorization',
      description: 'Ensuring Auth is properly set up',
      status: TaskStatus.OPEN,
      creatorId: '1',
      dueDate: new Date(),
      updatedAt: new Date(),
      completed: false,
      assignedToId: '',
      assigneeId: '',
      assignerId: '',
      teamId: '',
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Task title here',
      description: 'this is where you add your task description',
      status: TaskStatus.OPEN,
      creatorId: '2',
      dueDate: new Date(),
      updatedAt: new Date(),
      completed: false,
      assignedToId: '',
      assigneeId: '',
      assignerId: '',
      teamId: '',
      createdAt: new Date()
    },
  ]

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return createTask(data)
  }

  async updateTask(id: string, data: Prisma.TaskUpdateInput): Promise<Task | null> {
    return updateTask(id, data)
  }

  async deleteTask(id: string): Promise<Task | null> {
    return deleteTask(id)
  }

  async getAllTasks(): Promise<Task[]> {
    return getAllTasks()
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this.prismaService.getPrismaClient().task.findUnique({ where: { id } });
  }

  async getTaskByUser(userId: string, contextService: ContextService ): Promise<Task | null> {
    const user = await this.contextService.getUserById(userId, prisma)
    return this.prismaService.getPrismaClient().task.findUnique({
      where:{creatorId: user?.id}
    })
  }

  // async getTaskByTeam(teamId: string, contextService: ContextService): Promise<Team | null>{
  //   const team = await this.contextService.getTeamById(teamId, prisma) 
  //   return this.prismaService.getPrismaClient().task.findUnique({
  //     where:(teamId: team?.id)
  //   })
  // }
}