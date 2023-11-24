import { Test, TestingModule } from '@nestjs/testing'
import { HistoryEntriesService } from './history-entries.service'

describe('HistoryEntriesService', () => {
  let service: HistoryEntriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryEntriesService],
    }).compile()

    service = module.get<HistoryEntriesService>(HistoryEntriesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
