import { Injectable } from '@nestjs/common';

@Injectable()
export class MastersService {
  async findById(id: string) {
    // TODO: Query Supabase for master
    throw new Error('Not implemented');
  }

  async findPending() {
    // TODO: Query Supabase for pending masters
    throw new Error('Not implemented');
  }

  async updateProfile(id: string, data: any) {
    // TODO: Update master profile in Supabase
    throw new Error('Not implemented');
  }
}
