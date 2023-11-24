import { Test, TestingModule } from '@nestjs/testing'
import { CreateVersionsController } from './create-versions.controller'

describe('CreateVersionsController', () => {
  let controller: CreateVersionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateVersionsController],
    }).compile()

    controller = module.get<CreateVersionsController>(CreateVersionsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
