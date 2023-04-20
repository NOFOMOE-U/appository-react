import { Prisma, PrismaClient, Task } from '@prisma/client'
import { ContextService } from '../../context/context.service'

const prisma = new PrismaClient()

export const getAllTasks = async (): Promise<Task[]> => {
  return prisma.task.findMany()
}

export const getTaskById = async (taskId: string, prisma: PrismaClient): Promise<Task | null> => {
  return prisma.task.findUnique({
    where: { id: taskId },
  })
}

export const createTask = async (data: Prisma.TaskCreateInput): Promise<Task> => {
  return prisma.task.create({ data })
}

export const updateTask = async (id: string, data: Prisma.TaskUpdateInput): Promise<Task | null> => {
  return prisma.task.update({
    where: { id },
    data: {...data },
  
  })
}

export const deleteTask = async (id: string): Promise<Task | null> => {
  return prisma.task.delete({
    where: { id },
  })
}

export const getTaskByUser = async (taskId: string, userId: string, contextService: ContextService): Promise<Task| null> => {
  return prisma.task.findUnique({
    where: {
      id: taskId,
      creatorId: userId
    },
  })
}
