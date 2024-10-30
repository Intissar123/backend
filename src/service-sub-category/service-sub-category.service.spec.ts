import { Test, TestingModule } from '@nestjs/testing';
import { ServiceSubCategoryService } from './service-sub-category.service';

describe('ServiceSubCategoryService', () => {
  let service: ServiceSubCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceSubCategoryService],
    }).compile();

    service = module.get<ServiceSubCategoryService>(ServiceSubCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
