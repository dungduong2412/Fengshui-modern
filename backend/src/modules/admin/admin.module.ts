import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminPolicy } from './admin.policy';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminPolicy],
  exports: [AdminService, AdminPolicy],
})
export class AdminModule {}
