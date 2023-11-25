import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin-panel.controller';

describe('AdminPanelController', () => {
  let controller: AdminController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
    }).compile()

    controller = module.get<AdminController>(AdminController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
