// Function to export a collaborative document as a PDF
import { MarkdownDocument } from '@appository/backend/data-access';
import fs from 'fs';
import errorMessages from 'libs/backend/data-access/src/middleware/permissions/error-messages';
import { MyOptions } from 'libs/backend/data-access/src/middleware/permissions/shield/my-options.interface';
import path from 'path';
import PDFKit from 'pdfkit';
import { SQLDocument } from '../PDFDocuments';
import { CollaborationOptions } from './collaboration-and-interaction/colab-document-interfaces';
import { createSQLDocument } from './create-sql-document';
import { createMarkdownDocument } from './markdown-doc';

const filePath = path.join(__dirname, 'export.pdf')
let newDocument: PDFKit.PDFDocument | MarkdownDocument | SQLDocument

export async function exportCollaborativeDocument(
  collaborationOptions: CollaborationOptions,
  documentContent: string,
  documentType: string,
  options: MyOptions,
): Promise<void> {
  // Create document based on doc type
  let newDocument: PDFKit.PDFDocument | MarkdownDocument | SQLDocument

  switch (documentType) {
    case 'pdf':
      newDocument = (await createPDFDocument(documentContent, options)) as Document
      break

    case 'markdown':
      // Add missing properties to match MarkdownDocument interface
      newDocument = {
        content: createMarkdownDocument(documentContent),
        visibility: 'public',
        categories: [],
        versionNumber: 1,
        attachedFiles: [],
        permissions: [],
        collaborators: [],
      }
      break

    case 'sql':
      newDocument = createSQLDocument(documentContent) as SQLDocument
      break

    default:
      throw new Error(errorMessages.InvalidDocument)
  }

  // Rest of function
}  



async function createPDFDocument(
  content: string,
  options: MyOptions,
): Promise<{ pdfDoc: PDFKit.PDFDocument; filePath: string }> {
  // Generate a unique file name based on timestaamp
  const timestamp = new Date().getTime()
  const fileName = `${options.title}_${timestamp}.pdf`

  const filePath = path.join(options.userFilePath, fileName)
  // Implementation for creating a PDF document
  const pdfDoc = new PDFKit()
  //pipe the pdf content to to a writable stream (file in this case)
  pdfDoc.pipe(fs.createWriteStream(filePath))
  //add content to the PDF
  pdfDoc.text(content)
  //finalize the PDF and close the stream
  pdfDoc.end()
  //return doc
  return { pdfDoc, filePath }
}




// Placeholder function to save or display the PDF
function savePDF(pdfDocument: PDFKit.PDFDocument, options: MyOptions): void {
  // In a real app, you'd allow users to download or view the PDF
  // For simplicity, we'll just log the data
  console.log('PDF data:', pdfDocument);
}
  


//review // Example usage
// const document = await createDocument('PDF content');
// const pdfDocument = await createPDFDocument('PDF content', options);
// const markdownDocument = createMarkdownDocument('Markdown content');

// //   todo Example usage - FRONTEND CODE
//   const collaborativeDocument = `
//     <html>
//       <body>
//         <h1>Collaborative Document</h1>
//         <p>This is a collaborative document with text and images.</p>
//         <img src="image.jpg" alt="Image" />
//       </body>
//     </html>
//   `;
  
// exportCollaborativeDocument(collaborativeDocument, 'pdf');
  







// apps/
//   your-app/
//     src/
//       app/
//         ... (your application code)
// libs/
//   backend/
//     communication/
//     data-access/
//       src/
//         lib/
//           prisma.service.ts
//           ...
//       index.ts
//     permissions/
//       src/
//         lib/
//           permissions.module.ts
//           ...
//       index.ts
//     shared/
//       src/
//         lib/
//           shared.controller.ts
//           ...
//       index.ts
//   ...
