//todo versioning system

import { CustomPDFDocument } from "../custom-pdf-document"
import { CollaborationOptions } from "./co-document-interfaces"

// Function to display revision history
export function displayRevisionHistory(
    pdfDoc: CustomPDFDocument,
    collaborationOptions: CollaborationOptions,
    revisions: RevisionData[],
  ): void {
    // Implement logic to display revision history
    // Example:
    for (const revision of revisions) {
      pdfDoc.text(`Revision ${revision.version}: ${revision.changes}`, { align: 'left' })
      pdfDoc.moveDown(0.5)
    }
  }