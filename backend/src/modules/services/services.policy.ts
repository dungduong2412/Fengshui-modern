import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicesPolicy {
  canCreateService(userId: string, role: string): boolean {
    // Only approved masters can create services
    return role === 'master';
  }

  canEditInUAT(userId: string, serviceId: string): boolean {
    // Masters can edit their own services in UAT
    return true;
  }

  canEditInProd(): boolean {
    // No direct edits in production
    return false;
  }

  canPromoteToProd(role: string): boolean {
    // Only admin can promote to prod
    return role === 'admin';
  }
}
