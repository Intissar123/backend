import { Module } from '@nestjs/common';
import { CmdfournisseurService } from './cmdfournisseur.service';
import { CmdfournisseurController } from './cmdfournisseur.controller';

@Module({
  providers: [CmdfournisseurService],
  controllers: [CmdfournisseurController]
})
export class CmdfournisseurModule {}
