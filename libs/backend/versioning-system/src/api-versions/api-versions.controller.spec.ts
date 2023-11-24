import { Test, TestingModule } from '@nestjs/testing'
import { ApiVersionsController } from './api-versions.controller'

describe('ApiVersionsController', () => {
  let controller: ApiVersionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiVersionsController],
    }).compile()

    controller = module.get<ApiVersionsController>(ApiVersionsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
