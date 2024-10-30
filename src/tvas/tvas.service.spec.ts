import { Test, TestingModule } from '@nestjs/testing';
import { TvasService } from './tvas.service';

describe('TvasService', () => {
  let service: TvasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TvasService],
    }).compile();

    service = module.get<TvasService>(TvasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
