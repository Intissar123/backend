import { Test, TestingModule } from '@nestjs/testing';
import { TvasController } from './tvas.controller';

describe('TvasController', () => {
  let controller: TvasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TvasController],
    }).compile();

    controller = module.get<TvasController>(TvasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
