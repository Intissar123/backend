import { Test, TestingModule } from '@nestjs/testing';
import { CmdfournisseurController } from './cmdfournisseur.controller';

describe('CmdfournisseurController', () => {
  let controller: CmdfournisseurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CmdfournisseurController],
    }).compile();

    controller = module.get<CmdfournisseurController>(CmdfournisseurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
