import { PartialType } from '@nestjs/mapped-types';
import { CreateCommandelineDto } from './create-Commandeline.dto';

export class UpdateCommandelineDto extends PartialType(CreateCommandelineDto) { }