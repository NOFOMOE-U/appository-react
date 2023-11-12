import { Injectable } from '@nestjs/common';

@Injectable()
export class BehaviorTrackingService {
  // Simulating behavior tracking with some console logs
  trackUserBehavior(user: any, action: string) {
    console.log(`User ${user.id} performed action: ${action}`);
    // You might log this information to a database, analytics service, or file as per your app's requirements
  }
}
