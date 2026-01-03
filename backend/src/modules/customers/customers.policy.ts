import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersPolicy {
  canAccessProfile(requesterId: string, customerId: string): boolean {
    // Customers can only access their own profile
    return requesterId === customerId;
  }

  canViewServices(): boolean {
    // All customers can view approved services
    return true;
  }
}
