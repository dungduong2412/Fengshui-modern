import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomersPolicy } from './customers.policy';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, CustomersPolicy],
  exports: [CustomersService, CustomersPolicy],
})
export class CustomersModule {}
