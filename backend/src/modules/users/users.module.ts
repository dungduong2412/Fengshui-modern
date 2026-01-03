import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersPolicy } from './users.policy';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersPolicy],
  exports: [UsersService, UsersPolicy],
})
export class UsersModule {}
