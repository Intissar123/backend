import { PartialType } from '@nestjs/mapped-types';
import { CreateFournisseurDto } from './create-Fournisseur.dto';

export class UpdateFournisseurDto extends PartialType(CreateFournisseurDto) { }