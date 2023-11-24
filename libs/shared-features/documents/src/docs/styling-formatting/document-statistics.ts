import { CollaborationOptions } from "../collaboration-and-interaction/colab-document-interfaces"
import { CustomPDFDocument } from "../custom-pdf-document"
//todo: Implement function to calculate word and character count
// Function to display document statistics
export function displayDocumentStatistics(
    pdfDoc: CustomPDFDocument,
    collaborationOptions: CollaborationOptions,
    wordCount: number,
    characterCount: number,
  ): void {
    // Implement logic to calculate and display document statistics
    // Example:
    pdfDoc.text(`Word Count: ${wordCount}`, { align: 'right' })
    pdfDoc.text(`Character Count: ${characterCount}`, { align: 'right' })
  }
  