import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthPolicy } from './auth.policy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthPolicy],
  exports: [AuthService, AuthPolicy],
})
export class AuthModule {}
