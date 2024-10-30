import { Test, TestingModule } from '@nestjs/testing';
import { ServiceSubCategoryController } from './service-sub-category.controller';

describe('ServiceSubCategoryController', () => {
  let controller: ServiceSubCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceSubCategoryController],
    }).compile();

    controller = module.get<ServiceSubCategoryController>(ServiceSubCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
