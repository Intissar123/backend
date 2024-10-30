import { Module } from '@nestjs/common';
import { DepotController } from './depot.controller';
import { DepotsService } from './depot.service';

@Module({
  controllers: [DepotController],
  providers: [DepotsService]
})
export class DepotModule {}
