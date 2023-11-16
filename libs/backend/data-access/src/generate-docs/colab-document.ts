// Function to export a collaborative document as a PDF
import fs from 'fs';
import {
  MarkdownDocument,
  SQLDocument
} from 'libs/shared-features/documents/src/PDFDocuments';
import path from 'path';
import PDFKit from 'pdfkit';
import errorMessages from '../middleware/permissions/error-messages';
import { MyOptions } from '../middleware/permissions/shield/my-options.interface';
import { createSQLDocument } from './create-sql-document';
import { createMarkdownDocument } from './markdown-doc';
import { createDocument } from './markdown/create-document';

const filePath = path.join(__dirname, 'export.pdf')
let newDocument: PDFKit.PDFDocument | MarkdownDocument | SQLDocument

export async function exportCollaborativeDocument(
  documentContent: string,
  documentType: string,
  options: MyOptions,
): Promise<void> {
  // Create document based on doc type
  switch(documentType) {
    case 'pdf':
      newDocument = await createPDFDocument(documentContent, options)
      break
    case 'markdown':
      newDocument = createMarkdownDocument(documentContent)
      break
    case 'sql':
      newDocument = createSQLDocument(documentContent)
      break
    default:
       throw new Error (errorMessages.InvalidDocument)
  }

  // Open a new window to render the document
  
  const exportWindow = newDocument as unknown as Window
  if (exportWindow) {
    // Write the collaborative document content to the new window
  exportWindow.document.body.innerHTML = documentContent

  // Ensure all content is loaded
 exportWindow.document.addEventListener('DOMContentLoaded', async () => {
    // Generate the PDF
    // For simplicity, we'll use a placeholder PDF generation function
    const pdfData = await generatePDF(exportWindow)

    // Close the export window
    exportWindow.close()

    // Save or display the PDF, e.g., initiate download
    savePDF( pdfData, options)
  })
}
  async function generatePDF(window: Window) {
    const pdfDoc = await createDocument(window.document.body.innerHTML)
    return pdfDoc
  }
  
}


async function createPDFDocument(content: string, options: MyOptions): Promise<PDFKit.PDFDocument> {
    // Implementation for creating a PDF document
  const pdfDoc = new PDFKit()
  //pipe the pdf content to to a writabe stream (file in this case)
  pdfDoc.pipe(fs.createWriteStream(options.userFilePath))
  //add content to the PDF
  pdfDoc.text(content)
  //finalize the PDF and close the stream
  pdfDoc.end()
  //return doc
  return pdfDoc;
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
  