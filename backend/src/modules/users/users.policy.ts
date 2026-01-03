import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersPolicy {
  canViewProfile(requesterId: string, profileId: string): boolean {
    // Customers can only view their own profile
    // Admin can view all profiles
    return false;
  }

  canUpdateProfile(requesterId: string, profileId: string): boolean {
    // Users can only update their own profile
    return requesterId === profileId;
  }
}
