import { PartialType } from '@nestjs/mapped-types';
import { CreateDepotDto } from './create-Depot.dto';

export class UpdateDepotDto extends PartialType(CreateDepotDto) { }