import { Test, TestingModule } from '@nestjs/testing'
import { BackendDataAccessService } from './backenddataaccess.service'

describe('BackendDataAccessService', () => {
  let service: BackendDataAccessService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackendDataAccessService],
    }).compile()

    service = module.get<BackendDataAccessService>(BackendDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
