import { Test, TestingModule } from '@nestjs/testing'
import { ApiVersionsService } from './api-versions.service'

describe('ApiVersionsService', () => {
  let service: ApiVersionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiVersionsService],
    }).compile()

    service = module.get<ApiVersionsService>(ApiVersionsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
