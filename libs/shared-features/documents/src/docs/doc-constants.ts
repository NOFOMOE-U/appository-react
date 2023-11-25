import { CursorPosition } from "./tools/cursor/real-time-cursor-tracking";

// Define export constants
export const MAX_TRAIL_LENGTH = 100; // Adjust the value based on your needs
export const otherCursors: CursorPosition[] = []; // Assuming otherCursors is an array of CursorPosition
export const COLLISION_ADJUSTMENT = 5; // Adjust the value based on your needs
export const COLLISION_THRESHOLD = 10; // Adjust the value based on your needs
export const LABEL_FONT_SIZE = 20;
// Rest of your code...



// shared-features/documents/document-constants.ts

export const DOCUMENT_TYPES = {
    PDF: 'pdf',
    WORD: 'word',
    // Add more document types as needed
  };
  
  export const DOCUMENT_STATUSES = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    // Add more document statuses as needed
  };
  