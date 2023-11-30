import { checkPermissions } from '@appository/backend/data-access'
import { UserWithAccessToken } from '@appository/backend/users'
import { prisma } from 'libs/backend/data-access/src/lib/prisma/prisma'
import { MyOptions } from 'libs/backend/data-access/src/middleware/permissions/shield/my-options.interface'
import { socket } from 'libs/backend/data-access/src/server'
import { CollaborationOptions } from '../../collaboration-and-interaction/colab-document-interfaces'
import { getDocumentById } from '../../get-document-by-id'
import { createDocument } from '../../markdown/create-document'
interface DocumentPermissions {
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
  share: boolean
  comment: boolean
  download: boolean
}


export interface DocumentUserPermission {
  userId: string;
  permissions: DocumentPermissions;
}
export interface DocumentPermissionsMatrix {
  users: Array<{
    userId: string
    permissions: DocumentPermissions
  }>
}

export function getDocumentPermissions(
  documentId: string,
  currentUser: UserWithAccessToken,
): DocumentPermissions | undefined {
  const documentPermissions: DocumentPermissionsMatrix = {
    users: [
      {
        userId: 'user1',
        permissions: {
          create: true,
          read: true,
          update: false,
          delete: false,
          share: true,
          comment: true,
          download: true,
        },
      },
    ],
  }

  // find the permissions for the specificed documentId
  const permissionsForDocument = documentPermissions.users.find((user) => user.userId === documentId)

  // return the permissions if found, otherwise return undefiined
  return permissionsForDocument?.permissions
}

export async function setDocumentUserPermissions(
  documentId: number,
  userId: string,
  updatedPermissions: DocumentPermissions,
): Promise<void> {
  // Check if the user has the necessary permissions to update permissions
  // todo upddate user level
  const currentUserPermissions = await checkPermissions('USER_LEVEL', 'DOCUMENT', 'update')

  // Retrieve existing document permissions
  const existingPermissions: DocumentPermissions[] = [
    {
      userId: 'user1',
      permissions: {
        create: true,
        read: true,
        update: false,
        delete: false,
        share: true,
        comment: true,
        download: true,
      },
    },
  ]

  const userIndex: number = existingPermissions.findIndex((user: any) => user.userId === userId)


  if (userIndex !== -1) { 
    existingPermissions[userIndex].permissions = updatedPermissions

    // Save updated permissions
    saveOrUpdateDocumentPermissions(documentId, existingPermissions)
  }
}

// Pseudo code for Fine-Grained Permissions
function updatePermissions(documentId: any, userId: any, updatedPermissions: any) {
  // Check if the user has the necessary permissions to update permissions
  const currentUserPermissions = getDocumentPermissions(documentId, currentUser.id)
  if (currentUserPermissions.canUpdatePermissions) {
    // Update the permissions for the specified user
    setDocumentUserPermissions(documentId, userId, updatedPermissions)

    // Broadcast the permission update to other collaborators in real-time
    socket.emit('broadcast-permission-update', { documentId, userId, updatedPermissions })
  }
}

socket.on('broadcast-permission-update', ({ documentId, userId, updatedPermissions }) => {
  // Receive and update permission changes from other users in real-time
  setDocumentUserPermissions(documentId, userId, updatedPermissions)
})

// Pseudo function to save or update document permissions
async function saveOrUpdateDocumentPermissions(
  document: {
    documentId: number,
    id: number; title?:
    string; content?:
    string, permissions?:
    DocumentPermissions
  },
  type: 'MarkdownDocument' | 'PermissionsDocument',
  collaborationOptions: CollaborationOptions,
  options: MyOptions
  
): Promise<void> {
  try {

    let existingDocument: any;
    //check if the document exists in the data source
    if (type === 'MarkdownDocument') {
      existingDocument = await prisma.markdownDocument.findUnique({
        where: { id: document.id }
      })
    } else if (type === 'PermissionsDocument') {
      //impement the ogic to retrieve permissiions document (e.g, getDocumentById)
      existingDocument = getDocumentById(document.id, type)
    }

    if (existingDocument) {
      console.log(`Updating ${type} with ID ${document.id}`)
      console.log('Received data:', document)

      // replace existing data with the new one
      if (type === 'MarkdownDocument') {
        await prisma.markdownDocument.update({
          where: { id: document.id },
          data: { title: document.title, content: document.content }
        })
      } else if (type === 'PermissionsDocument') {
        //repace existing permissions with the new ones
        existingDocument.permissions = document.permissions

        // save the updated document back to the data source
        updateDocument(existingDocument)
      }
    } else {
      // Document doesn't exist, create a new entry
      console.log(`Creating new ${type} with ID ${document.id}`)
      console.log('Received data:', document)

      if (type === 'MarkdownDocument') {
        await prisma.markdownDocument.create({
          data: { id: document.id, title: document.title, content: document.content }, content: document.content
        })
      }
    }
  } finally {
    // Return a success message
    return { message: 'Permissions saved/updated successfully' };
  }
}
  // Implement logic to save or update document permissions in your data source
  // Example: savePermissionsToDatabase(documentId, permissions);

  // Here you can add the actual logic for saving or updating
  // document permissions in your data source, such as a database.

  // Check if the document already exists in the data source
  const existingDocument = getDocumentById(documentId, type);

  if (existingDocument) {
    // Document exists, update permissions
    console.log(`Updating permissions for existing document with ID ${documentId}`);
    console.log('Received permissions:', permissions);

    // Replace existing permissions with the new ones
    existingDocument.permissions = permissions;

    // Save the updated document back to the data source
    updateDocument(existingDocument);
  } else {
    // Document doesn't exist, create a new entry
    console.log(`Creating new document with ID ${documentId}`);
    console.log('Received permissions:', permissions);

    // Create a new document entry with the received permissions
    const newDocument = {
      id: documentId,
      permissions: permissions,
    };

    // Save the new document to the data source
    createDocument(newDocument, options, collaborationOptions);
  }



function updateDocument(document: Document): void {
  // Implement logic to update a document in your data source
  // Example: updateDocumentInDatabase(document);
}


