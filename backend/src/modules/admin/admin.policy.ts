import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminPolicy {
  isAdmin(role: string): boolean {
    return role === 'admin';
  }

  canApproveMaster(role: string): boolean {
    return role === 'admin';
  }

  canApproveService(role: string): boolean {
    return role === 'admin';
  }

  canPromoteToProd(role: string): boolean {
    return role === 'admin';
  }

  canViewAllUsers(role: string): boolean {
    return role === 'admin';
  }
}
