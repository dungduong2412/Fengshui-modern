import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicesService {
  async findById(id: string) {
    // TODO: Query Supabase for service
    throw new Error('Not implemented');
  }

  async findByEnvironment(env: 'uat' | 'prod') {
    // TODO: Query services by environment from Supabase
    throw new Error('Not implemented');
  }

  async create(data: any) {
    // TODO: Create service in UAT environment
    // Services must have strict input/output schemas
    throw new Error('Not implemented');
  }

  async promote(serviceId: string) {
    // TODO: Promote service from UAT to PROD
    // Only callable by admin
    throw new Error('Not implemented');
  }
}
