import { Test, TestingModule } from '@nestjs/testing'
import { InitVersionsService } from './init-versions.service'

describe('InitVersionsService', () => {
  let service: InitVersionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InitVersionsService],
    }).compile()

    service = module.get<InitVersionsService>(InitVersionsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
