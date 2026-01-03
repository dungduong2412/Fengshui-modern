import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // Business logic only - no authorization checks
  
  async login(loginDto: any) {
    // TODO: Implement login with Supabase client
    throw new Error('Not implemented');
  }

  async signup(signupDto: any) {
    // TODO: Implement signup with Supabase client
    throw new Error('Not implemented');
  }
}
