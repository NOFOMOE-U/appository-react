//todo set up external doc sharing 
// export  function shareViaCloudStorage(document, storageService) {
//     // Logic to upload the document to the specified cloud storage service
//     // For instance, using the API of the chosen cloud storage service
//   }
  

// export  function shareViaCollaborationTool(document, tool) {
//     // Logic to share the document using the specified collaboration tool
//     // Using APIs provided by the collaboration platform (like Google Docs, Office 365, etc.)
//   }
  

//   export async function shareViaDocumentHosting(documentData, hostingService) {
//     // Logic to upload the document data to the hosting service
//     try {
//       // Simulating the upload process
//       const uploadedLink = await uploadToDocumentHosting(documentData, hostingService);
  
//       // Share the generated link with users
//       await shareLink(uploadedLink);
  
//       console.log(`Document uploaded and shared via ${hostingService}`);
//     } catch (error) {
//       console.error(`Error sharing via ${hostingService}: ${error}`);
//     }
//   }
  
//   export async function uploadToDocumentHosting(documentData, hostingService) {
//     // Upload the document data to the hosting service
//     // Simulating an upload process, for example, via an API request
//     const uploadResponse = await someDocumentHostingAPI.upload(documentData);
  
//     // Assuming the uploadResponse contains a link to the uploaded document
//     return uploadResponse.link;
//   }
  
//   export async function shareLink(link) {
//     // Logic to share the generated link
//     // This can include sending the link via email, generating a public URL, etc.
//     console.log(`Sharing link: ${link}`);
//     // In a real application, this might involve sending the link to users via a service
//   }
  