import { PartialType } from '@nestjs/mapped-types';
import { CreateCmdfournisseurDto } from './create-cmdfournisseur.dto';

export class UpdateCmdfournisseurDto extends PartialType(CreateCmdfournisseurDto) { }