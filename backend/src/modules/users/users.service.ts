import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async findById(id: string) {
    // TODO: Query Supabase for user
    throw new Error('Not implemented');
  }

  async updateProfile(id: string, data: any) {
    // TODO: Update user profile in Supabase
    throw new Error('Not implemented');
  }
}
