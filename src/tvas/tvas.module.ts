import { Module } from '@nestjs/common';
import { TvasController } from './tvas.controller';
import { TvasService } from './tvas.service';

@Module({
  controllers: [TvasController],
  providers: [TvasService]
})
export class TvasModule {}
