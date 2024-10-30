import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceSubCategoryDto } from './create-service-subcategory.dto';

export class UpdateServiceSubCategoryDto extends PartialType(CreateServiceSubCategoryDto) { }