export const permissionsMatrix: {
  [key: string]: {
    [key: string]: {
      [key: string]: boolean
    }
  }
} = {
  ADMIN: {
    PROJECT: {
      create: true,
      read: true,
      update: true,
      delete: true,
      invite: true,
      remove: true,
    },
    TASK: {
      create: true,
      read: true,
      update: true,
      delete: true,
      reassign: true,
      updateDueDate: true,
    },
    USER: {
      read: true,
      update: true,
      delete: true,
    },
    TEAM: {
      read: true,
      update: true,
      delete: true,
    },
  },
  MODERATOR: {
    PROJECT: {
      create: false,
      read: true,
      update: false,
      delete: false,
      invite: true,
      remove: true,
    },
    TASK: {
      create: false,
      read: true,
      update: false,
      delete: false,
      reassign: true,
      updateDueDate: true,
    },
  },
  USER: {
    PROJECT: {
      create: true,
      read: true,
      update: true,
      delete: true,
      invite: true,
      remove: true,
    },
    TASK: {
      create: true,
      read: true,
      update: true,
      delete: true,
      reassign: true,
      updateDueDate: true,
    },
  },
}
