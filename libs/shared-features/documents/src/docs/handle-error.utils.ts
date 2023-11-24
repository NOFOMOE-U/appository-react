// collaborationUtils.ts

import { PDFKit } from 'pdfkit';
import { CollaborationOptions, } from './collaboration-and-interaction/colab-document-interfaces';
import { addOutlines, addParagraphs, addStickyNotes } from './collaboration-and-interaction/colab-document-options';
import { addDraggableSections, addHeader } from './markdown/create-document';
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
