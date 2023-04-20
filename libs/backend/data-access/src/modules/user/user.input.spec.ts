import { Test, TestingModule } from '@nestjs/testing'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { UserInput } from './user.input'
import { UserService } from './user.service'

describe('UserInput', () => {
  let userInput: UserInput
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile()

    service = module.get<UserService>(UserService)
    beforeEach(() => {
      userInput = new UserInput()
    })

    it('should be defined', () => {
      expect(userInput).toBeDefined()
    })

    it('should have default values', () => {
      expect(userInput.name).toEqual('')
      expect(userInput.email).toEqual('')
      expect(userInput.password).toEqual('')
      expect(userInput.createdAt).toBeInstanceOf(Date)
      expect(userInput.updatedAt).toBeInstanceOf(Date)
      expect(userInput.confirmPassword).toEqual('')
      expect(userInput.roles).toBeUndefined()
      expect(userInput.role).toBeUndefined()
      expect(userInput.confirmPasswordMatch).toBeFalsy()
    })

    it('should be initialized with partial values', () => {
      userInput = new UserInput({ name: 'John', email: 'john@example.com' })

      expect(userInput.name).toEqual('John')
      expect(userInput.email).toEqual('john@example.com')
      expect(userInput.password).toEqual('')
      expect(userInput.createdAt).toBeInstanceOf(Date)
      expect(userInput.updatedAt).toBeInstanceOf(Date)
      expect(userInput.confirmPassword).toEqual('')
      expect(userInput.roles).toBeUndefined()
      expect(userInput.role).toBeUndefined()
      expect(userInput.confirmPasswordMatch).toBeFalsy()
    })

    it('should validate successfully', async () => {
      userInput = plainToClass(UserInput, {
        name: 'John',
        email: 'john@example.com',
        password: 'password',
        confirmPassword: 'password',
      })

      const errors = await validate(userInput)

      expect(errors.length).toEqual(0)
    })

    it('should fail validation when passwords do not match', async () => {
      userInput = plainToClass(UserInput, {
        name: 'John',
        email: 'john@example.com',
        password: 'password',
        confirmPassword: 'wrongpassword',
      })

      const errors = await validate(userInput)

      expect(errors.length).toEqual(1)
      expect(errors[0].constraints?.matchesPassword).toEqual('Passwords do not match')
    })

    it('should fail validation when email is empty', async () => {
      userInput = plainToClass(UserInput, {
        name: 'John',
        email: '',
        password: 'password',
        confirmPassword: 'password',
      })

      const errors = await validate(userInput)

      expect(errors.length).toEqual(1)
      expect(errors[0].constraints?.isNotEmpty).toEqual('email should not be empty')
    })

    it('should fail validation if confirmPassword does not match password', async () => {
      const data = {
        name: 'John',
        email: 'john@example.com',
        password: 'password',
        confirmPassword: 'notmatch',
      }

      const userInput = new UserInput(data)

      // Validate the user input and expect it to fail
      await expect(service.validateUserInput(userInput)).rejects.toThrow()
    })
  })
})
