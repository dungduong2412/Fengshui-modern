import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ServicesPolicy } from './services.policy';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, ServicesPolicy],
  exports: [ServicesService, ServicesPolicy],
})
export class ServicesModule {}
