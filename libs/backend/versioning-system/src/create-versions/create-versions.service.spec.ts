import { Test, TestingModule } from '@nestjs/testing'
import { CreateVersionsService } from './create-versions.service'

describe('CreateVersionsService', () => {
  let service: CreateVersionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateVersionsService],
    }).compile()

    service = module.get<CreateVersionsService>(CreateVersionsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
