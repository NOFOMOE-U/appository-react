import { Test, TestingModule } from '@nestjs/testing'
import { AquaService } from './aqua.service'

describe('AquaService', () => {
  let service: AquaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AquaService],
    }).compile()

    service = module.get<AquaService>(AquaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
