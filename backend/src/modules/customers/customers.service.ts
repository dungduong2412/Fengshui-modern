import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  async findById(id: string) {
    // TODO: Query Supabase for customer profile
    throw new Error('Not implemented');
  }

  async updateProfile(id: string, data: any) {
    // TODO: Update customer profile (DOB, gender, etc.) in Supabase
    // This is gold layer data - must be accurate
    throw new Error('Not implemented');
  }

  async getConsultations(customerId: string) {
    // TODO: Get customer's consultation history
    throw new Error('Not implemented');
  }
}
