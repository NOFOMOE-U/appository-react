import { NextFunction } from "express-serve-static-core";
import { socket } from "libs/backend/data-access/src/server";
import { getUserInfo } from '../../../../../../backend/data-access/src/middleware/permissions/shield/get-user-by-info';




function sendUserInvitation(documentId: string, invitedUserId:number, permissions: any, expiryDate: any, next: NextFunction) {
  // get user
  const invitedUser = getUserInfo(invitedUserId , next);
  // Logic to send user invitation



}

function inviteUserWithExpiry(documentId, invitedUserId, permissions, expiryDate) {
    // Check if the user has the necessary permissions to invite other users
    const currentUserPermissions = getDocumentPermissions(documentId, currentUser.id);
    if (currentUserPermissions.canAddUsers) {
      // Send an invitation to the user with specified permissions and expiry date
      sendUserInvitation(documentId, invitedUserId, permissions, expiryDate);
  
      // Broadcast the invitation to other collaborators in real-time
      socket.emit('broadcast-user-invitation', { documentId, invitedUserId, permissions, expiryDate });
    }
  }
  
  socket.on('broadcast-user-invitation', ({ documentId, invitedUserId, permissions, expiryDate }) => {
    // Receive and process user invitations from other users in real-time
    processUserInvitation(documentId, invitedUserId, permissions, expiryDate);
  });
  

const processUserInvitation = (documentId: number, invitedUserId: number, permissions: any, expiryDate: any) => { 
  // Add user to document with specified permissions
  addUserToDocument(documentId, invitedUserId, permissions, expiryDate);
  // Permission will be revoked on expiry date
  const revokeExpiredPermissions = () => {
    // Check for expired permissions and revoke
    const expiredPermissions = checkForExpiredPermissions(expiryDate);
    if(expiredPermissions) {
      revokeUserPermissions(documentId, invitedUserId);
    }
  }

  // Schedule permission revocation on expiry
  setTimeout(revokeExpiredPermissions, expiryDate);
}