import { Test, TestingModule } from '@nestjs/testing'
import { InitVersionsController } from './init-versions.controller'

describe('InitVersionsController', () => {
  let controller: InitVersionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InitVersionsController],
    }).compile()

    controller = module.get<InitVersionsController>(InitVersionsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
