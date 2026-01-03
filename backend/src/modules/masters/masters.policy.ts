import { Injectable } from '@nestjs/common';

@Injectable()
export class MastersPolicy {
  canCreateService(masterId: string): boolean {
    // Check if master is approved
    // TODO: Query approval status from Supabase
    return false;
  }

  canAccessUAT(masterId: string): boolean {
    // Masters can access UAT environment
    return true;
  }

  canAccessProd(masterId: string): boolean {
    // Masters cannot directly access prod
    return false;
  }
}
