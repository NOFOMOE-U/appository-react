// collaborationUtils.ts

import { addDraggableSections, addHeader } from './markdown/create-document';
import { CollaborationOptions, } from './tools/co-document-interfaces';
import { addOutlines, addParagraphs, addStickyNotes } from './tools/colab-document-options';
export function handleCollaborationOptions(
  pdfDoc: PDFKit.PDFDocument,
  collaborationOptions: CollaborationOptions
): void {
  if (!collaborationOptions) {
    throw new Error('Collaboration options are required.');
  }

  // Ensure collaboration options are complete and handle each tool
  if (collaborationOptions.outlines) {
    addOutlines(pdfDoc, collaborationOptions.outlines);
  }

  if (collaborationOptions.paragraphs) {
    addParagraphs(pdfDoc, collaborationOptions.paragraphs);
  }

  // ... handle other collaboration tools ...

  if (collaborationOptions.stickyNotes) {
    addStickyNotes(pdfDoc, collaborationOptions.stickyNotes);
  }

  if (collaborationOptions.header) {
    addHeader(pdfDoc, collaborationOptions.header);
  }

  if (collaborationOptions.draggableSections) {
    addDraggableSections(pdfDoc, collaborationOptions.draggableSections);
  }
}

// Add other collaboration tool functions as needed
