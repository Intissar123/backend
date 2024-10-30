import { Test, TestingModule } from '@nestjs/testing';
import { DepotsService } from './depot.service';

describe('DepotService', () => {
  let service: DepotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepotsService],
    }).compile();

    service = module.get<DepotsService>(DepotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
