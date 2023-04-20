import { PrismaClient } from '@prisma/client'
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './user'

const prisma = new PrismaClient()

describe('user', () => {
  const prisma = new PrismaClient()

  afterAll(async () => {
    await prisma.$disconnect()
  })

  afterEach(async () => {
    await prisma.user.deleteMany()
  })

  describe('createUser', () => {
    it('should create a user', async () => {
      const data = {
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'feai3i5a39',
        password: 'feai3i5a39',
      }
      const user = await createUser(data)

      expect(user.id).toBeDefined()
      expect(user.email).toBe(data.email)
      expect(user.name).toBe(data.name)
      expect(user.password).not.toBe(data.password)
      expect(user.passwordHash).toBeUndefined()
      expect(user.createdAt).toBeDefined()
      expect(user.updatedAt).toBeDefined()
    })
  })

  describe('getUserById', () => {
    it('should return null for a non-existing user', async () => {
      const user = await getUserById('non-existing-user-id')
      expect(user).toBeNull()
    })

    it('should return the user with the given id', async () => {
      const data = {
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'randomHash',
      }

      const createdUser = await prisma.user.create({ data })
      const user = await getUserById(createdUser.id)

      expect(user).toMatchObject(createdUser)
    })
  })

  describe('updateUser', () => {
    it('should return null for a non-existing user', async () => {
      const user = await updateUser('non-existing-user-id', { name: 'New Name', passwordHash: '' })
      expect(user).toBeNull()
    })

    it('should update the user with the given id', async () => {
      const data = {
        email: 'test@example.com',
        name: 'Test User',
        passwordHash:'radomhash'
      }
      const createdUser = await prisma.user.create({ data })
      const updatedData = { name: 'New Name', passwordHash: ''}
      const updatedUser = await updateUser(createdUser.id, updatedData)

      expect(updatedUser).toMatchObject({ ...createdUser, ...updatedData })
    })
  })

  describe('deleteUser', () => {
    it('should return null for a non-existing user', async () => {
      const user = await deleteUser('non-existing-user-id')
      expect(user).toBeNull()
    })

    it('should delete the user with the given id', async () => {
      const data = {
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'randomHash',
      }
      const createdUser = await prisma.user.create({ data })
      const deletedUser = await deleteUser(createdUser.id)
      const user = await prisma.user.findUnique({ where: { id: createdUser.id } })

      expect(deletedUser).toMatchObject(createdUser)
      expect(user).toBeNull()
    })
  })

  describe('getAllUsers', () => {
    it('should return an empty array when there are no users', async () => {
      const users = await getAllUsers()
      expect(users).toEqual([])
    })

    it('should return all the users', async () => {
      const data1 = {
        email: 'test1@example.com',
        name: 'Test User 1',
        password: 'password',
      }
      const data2 = {
        email: 'test2@example.com',
        name: 'Test User 1',
        password: 'password',
      }
    })
  })
})
