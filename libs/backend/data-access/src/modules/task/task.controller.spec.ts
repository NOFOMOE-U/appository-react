import { ForbiddenException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TaskStatus } from '@prisma/client'
import { PermissionsService } from '../../middleware/permissions/permissions.service'
import { UserService } from '@appository/backend/users'
import { TaskService } from './task.service'
import { TasksController } from './tasks.controller'

describe('TasksController', () => {
  let tasksController: TasksController
  let taskService: TaskService
  let permissionsService: PermissionsService
  let userService: UserService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TaskService, PermissionsService, UserService],
    }).compile()

    tasksController = moduleRef.get<TasksController>(TasksController)
    taskService = moduleRef.get<TaskService>(TaskService)
    permissionsService = moduleRef.get<PermissionsService>(PermissionsService)
    userService = moduleRef.get<UserService>(UserService)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getTasks', () => {
    it('should throw ForbiddenException if user does not have permission to view the project', async () => {
      // Arrange
      // Arrange
      const query = {
        userId: '1',
        taskId: 1,
        projectMembers: ['member1', 'member2'],
      }
      // query.projectMembers =['member1', 'member2']
      jest.spyOn(permissionsService, 'canViewProject').mockReturnValue(false)

      // Act & Assert
      await expect(tasksController.getTasks(query)).rejects.toThrowError(
        new ForbiddenException('You are not a member of this project'),
      )
    })

    it('should throw ForbiddenException if user does not have permission to reassign the task', async () => {
      // Arrange
      const query = {
        userId: 'user123',
        taskId: 1,
        projectMembers: ['member1', 'member2'],
      }
      const user = {
        id: 'user123',
        email: 'user1@example.com',
        name: 'User One',
        roles: [],
        isAdmin: true,
        isAuthenticated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        resetPasswordToken: '',
      }
      const task = {
        id: '1',
        assigneeId: 'assignee123',
        title: '',
        description: '',
        assignerId: '',
        dueDate: new Date(),
        completed: false,
        creatorId: '2',
        teamId: '2',
        assignedToId: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: TaskStatus.OPEN,
      }
      jest.spyOn(permissionsService, 'canViewProject').mockReturnValue(true)
      jest.spyOn(userService, 'getUserById').mockResolvedValue(user)
      jest.spyOn(taskService, 'getTaskById').mockResolvedValue(task)
      jest.spyOn(permissionsService, 'canReassignTask').mockReturnValue(false)

      // Act & Assert
      await expect(tasksController.getTasks(query)).rejects.toThrowError(
        new ForbiddenException('You do not have permission to reassign this task'),
      )
    })

    it('should throw ForbiddenException if user does not have permission to update the task', async () => {
      // Arrange
      const query = {
        userId: 'user123',
        taskId: 1,
        projectMembers: ['member1', 'member2'],
      }
      const user = {
        id: 'user123',
        email: 'user1@example.com',
        name: 'User One',
        passwordHash: 'hash',
        roles: [],
        isAdmin: true,
        isAuthenticated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        resetPasswordToken: '',
      }

      const task = {
        id: '1',
        assigneeId: 'assignee123',
        title: '',
        description: '',
        assignerId: '',
        dueDate: new Date(),
        completed: false,
        creatorId: '2',
        teamId: '2',
        assignedToId: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: TaskStatus.OPEN,
      }
      jest.spyOn(permissionsService, 'canViewProject').mockReturnValue(true)
      jest.spyOn(userService, 'getUserById').mockResolvedValue(user)
      jest.spyOn(taskService, 'getTaskById').mockResolvedValue(task)
      jest.spyOn(permissionsService, 'canReassignTask').mockReturnValue(true)
      jest.spyOn(permissionsService, 'canUpdateTask').mockReturnValue(false)

      // Act
      const result = await tasksController.getTasks({ userId:'', taskId:1, projectMembers:[] })

      // Assert
      expect(result).toEqual({ user, task })
    })
  })
})
