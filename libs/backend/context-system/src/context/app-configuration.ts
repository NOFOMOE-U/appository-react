import { UserRole } from "@appository/backend/data-access";

export type AppConfiguration = {
    enableVideo: boolean;
    enableAudio: boolean;


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

  // Access Control
  restrictAccessByLocation: boolean; // Restrict access based on user location.
  allowedLocations: string[]; // List of allowed locations.

}


// how to use
// if (ctx.config.enableVideo){
    //Use video feature
// }
// if(ctx.config.enableAudio){{
    //Use audio feature
// }