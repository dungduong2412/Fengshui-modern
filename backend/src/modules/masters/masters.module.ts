import { Module } from '@nestjs/common';
import { MastersController } from './masters.controller';
import { MastersService } from './masters.service';
import { MastersPolicy } from './masters.policy';

@Module({
  controllers: [MastersController],
  providers: [MastersService, MastersPolicy],
  exports: [MastersService, MastersPolicy],
})
export class MastersModule {}
