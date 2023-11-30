import { checkPermissions } from "@appository/backend/data-access";
import { socket } from "libs/backend/data-access/src/server";
import confirmationMessages from '../../../../../../backend/data-access/src/requests/confirmation-messages';



function showTransferOwnershipConfirmationDialog(): boolean {
   // Display the confirmation dialog and return the result
   return window.confirm(confirmationMessages.documentTranserOwnership);
}


// Pseudo code for Document Transfer Limitations
async function transferOwnershipWithConfirmation(documentId: string, newOwnerUserId: string) {
    // Check if the user has the necessary permissions to transfer ownership
    const hasTransferOwnershipPermission = await checkPermissions('DOCUMENT', 'changeOwnership', 'POST');
    if (hasTransferOwnershipPermission) {
      // Show confirmation dialog to the user before transferring ownership
      const confirmed = showTransferOwnershipConfirmationDialog();
      if (confirmed) {

        //Transer ownership of the document to the new owner
        setDocumentOwner(documentId, newOwnerUserId);
  
        // Broadcast the ownership transfer to other collaborators in real-time
        socket.emit('broadcast-ownership-transfer', { documentId, newOwnerUserId });
      }
    }
  }
  