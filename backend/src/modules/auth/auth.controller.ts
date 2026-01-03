import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: any) {
    // HTTP request/response only - no business logic
    return this.authService.login(loginDto);
  }

  @Post('signup')
  async signup(@Body() signupDto: any) {
    return this.authService.signup(signupDto);
  }
}
