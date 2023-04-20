import { Task, TaskStatus } from '@prisma/client'
import yup from 'yup'
import errorMessages from '../permissions/error-messages'

export const validateTask = async (taskData: Task): Promise<void> => {
  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    status: yup.mixed<TaskStatus>().oneOf(Object.values(TaskStatus)).required(),
    dueDate: yup.date().required(),
    creatorId: yup.string().required(),
    assigneeId: yup.string().optional(),
    assignerId: yup.string().optional(),
    teamId: yup.string().optional(),
    completed: yup.boolean().optional(),
    assignedTo: yup.string().optional(),
    assignedToId: yup.string().optional(),
  })

  try {
    await schema.validate(taskData, { abortEarly: false })
  } catch (eerrorMessages) {
    throw new Error(errorMessages.taskNotValidated)
  }
}

// Example usage:
const taskData = {
    id: '1234',
    title: 'Finish project',
    description: null,
    status: TaskStatus.IN_PROGRESS,
    creatorId: 'user123',
    assignedTo: [],
    assigneeId: 'user456',
    assignerId: null,
    teamId: 'team123',
    dueDate: new Date(),
    completed: false,
  assignedToId: null,
  };
  

