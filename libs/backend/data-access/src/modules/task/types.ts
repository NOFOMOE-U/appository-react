
import { extendType, nullable, objectType, stringArg } from 'nexus'
import yup from 'yup'
import { validateTask } from '../../middleware/validation-yup-schemas/validate-task'
import { getUserId } from '../../utils/backend-auth.utils'
export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.string('id')
    t.string('title')
    t.string('description', {
    //   nullable: true
    })
    t.field('status', {type: 'TaskStatus' })
    t.string('creatorId')
    t.field('creator', {type: 'User'})
    t.string('assigneId')
    t.field('assigner', {type: 'User'})
    t.string('assigneToId')
    t.field('assignedTo', {type: 'User'})
    t.string('teamId')
    t.field('team', {type: 'Team'})
    t.boolean('completed')
    t.string('createdAt')
    t.string('updatedAt')
    t.string('dueDate', {
      // nullable: true
    })
    t.field('assignedTo', {
      type: 'User',
      // nullable: true,
      resolve: (parent, _, { prisma }) => {
        return prisma.task
          .findUnique({
            where: { id: parent.id },
          })
          .assignedTo()
      },
    })
    t.list.field('tasks', {type: 'Task'})

    t.list.field('teams', {type: 'Team'})
    t.field('team', {
      type: 'Team',
      // nullable: true,
      resolve: (parent, _, { prisma }) => {
        return prisma.task
          .findUnique({
            where: { id: parent.id },
          })
          .team()
      },
    })
  },
})

export const TaskQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('task', {
      type: 'Task',
      // nullable: true,
      args: {
        id: stringArg(),
      },
      resolve: async (_, args, { prisma, req }) => {
        const userId = getUserId(req)
        const task = await prisma.task.findUnique({
          where: { id: args.id },
        })

        if (!task) {
          throw new Error('Task not found')
        }

        if (task.assignedToId !== userId) {
          throw new Error('Not authorized to access this task')
        }

        return task
      },
    })
  },
})

export const TaskMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createTask', {
      type: 'Task',
      args: {
        title: stringArg(),
        description: stringArg({
          // nullable: true
        }),
        dueDate: stringArg({
          // nullable: true
        }),
        assignedToId: stringArg({
          // nullable: true
        }),
        teamId: stringArg({
          // nullable: true
        }),
      },
      resolve: async (_, args, { prisma, req }) => {
        const userId = getUserId(req)

        // Validate the input data
        try {
          const validatedArgs = await validateTask({
            id: args.id,
            title: args.title,
            description: args.description,
            dueDate: args.dueDate,
            completed: false,
            assignedToId: args.assignedToId,
            status: args.status,
            creatorId: args.creatorId,
            assigneeId: args.assigneeId,
            assignerId: args.assignerId,
            teamId: args.teamId,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
          })
        } catch (err) {
          const validationError = err as yup.ValidationError
          throw new Error(validationError.errors.join(', '))
        }

        const task = await prisma.task.create({
          data: {
            title: args.title,
            description: args.description,
            dueDate: args.dueDate,
            completed: false,
            assignedTo: args.assigneTo,
            assignedToId: args.assignedToId
              ? {
                  connect: { id: args.assignedToId },
                }
              : undefined,
            team: args.teamId
              ? {
                  connect: { id: args.teamId },
                }
              : undefined,
            createdBy: { connect: { id: userId } },
          },
        })

        return task
      },
    })
  },
})



export default nullable(Task)