import { UserRole } from "@appository/backend/data-access";
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
  getConfig(): AppConfiguration {
    // Transfer the content of your app-configuration.ts here
    return {
      enableVideo: true,
      enableAudio: true,
      defaultUserRole: UserRole.Viewer,
      userRoles: [UserRole.Viewer, UserRole.Editor, UserRole.Owner],
      allowRegistration: true,
      requireEmailVerification: false,
      restrictAccessByLocation: true,
      // ... other configuration properties
      enableRealTimeCollaboration: false,
      allowPublicRooms: true,
      allowPrivateRooms: false,
      enableModeration: false,
      moderatorRoles: [UserRole.Owner],
      allowFileUploads: true,
      maxFileSize: 0,
      enableNotifications: false,
      allowedLocations: ['US', 'CA', 'MX'],
    };
  }

  isVideoEnabled(): boolean {
    return this.getConfig().enableVideo;
  }

  isAudioEnabled(): boolean {
    return this.getConfig().enableAudio;
  }

  isRealTimeCollaborationEnabled(): boolean { 
    return this.getConfig().enableRealTimeCollaboration;
  }

  // ... additional methods for other configuration checks
}

export type AppConfiguration = {
  // ... your existing AppConfiguration type
  enableVideo: boolean
  enableAudio: boolean
  // User Permissions
  defaultUserRole: UserRole; // Default role for new users.
  userRoles: UserRole[]; // User roles with respective permissions.

  // User Registration and Verification
  allowRegistration: boolean; // Allow user registration.
  requireEmailVerification: boolean; // Require email verification for user accounts.

  // Room Creation
  allowPublicRooms: boolean; // Allow users to create public rooms.
  allowPrivateRooms: boolean; // Allow users to create private rooms.

  // Moderation
  enableModeration: boolean; // Enable content moderation features.
  moderatorRoles: UserRole[]; // User roles with moderation privileges.

  // File Uploads
  allowFileUploads: boolean; // Allow users to upload files.
  maxFileSize: number; // Maximum file size allowed (in bytes).

  // Notifications
    enableNotifications: boolean; // Allow users to receive notifications.
//   todo update prisma to recognize Type
  // notificationPreferences: NotificationPreferences[]; // Notification preferences.

  enableRealTimeCollaboration: boolean; // Enable real-time collaboration features.
  // Access Control
  restrictAccessByLocation: boolean; // Restrict access based on user location.
  allowedLocations: string[]; // List of allowed locations.

};



// how to use
// if (ctx.config.enableVideo){
    //Use video feature
// }
// if(ctx.config.enableAudio){{
    //Use audio feature
// }