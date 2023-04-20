
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
    t.boolean('completed')
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
        assignedTo: stringArg({
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
            // assignedTo: args.assignedTo,
            status: args.status,
            creatorId: args.creatorId,
            assigneeId: args.assigneeId,
            assignerId: args.assignerId,
            assignedToId: args.assignedToId,
            teamId: args.teamId,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt
            
            // team: args.teamId || undefined,
            // createdBy: {connect: {id: userId}},
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
            assignedTo: args.assignedTo
              ? {
                  connect: { id: args.assignedTo },
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