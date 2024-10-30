import { Test, TestingModule } from '@nestjs/testing';
import { CommandelineController } from './commandeline.controller';

describe('CommandelineController', () => {
  let controller: CommandelineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommandelineController],
    }).compile();

    controller = module.get<CommandelineController>(CommandelineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
