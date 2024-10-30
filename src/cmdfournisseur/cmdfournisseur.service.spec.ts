import { Test, TestingModule } from '@nestjs/testing';
import { CmdfournisseurService } from './cmdfournisseur.service';

describe('CmdfournisseurService', () => {
  let service: CmdfournisseurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CmdfournisseurService],
    }).compile();

    service = module.get<CmdfournisseurService>(CmdfournisseurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
