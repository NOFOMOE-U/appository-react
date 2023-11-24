import { Test, TestingModule } from '@nestjs/testing'
import { HistoryEntriesController } from './history-entries.controller'

describe('HistoryEntriesController', () => {
  let controller: HistoryEntriesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryEntriesController],
    }).compile()

    controller = module.get<HistoryEntriesController>(HistoryEntriesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
