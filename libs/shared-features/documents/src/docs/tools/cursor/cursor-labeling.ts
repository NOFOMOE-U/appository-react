import { socket } from "libs/backend/data-access/src/server";
import { CustomPDFDocument } from "../../custom-pdf-document";
import { LABEL_FONT_SIZE } from "../../doc-constants";
import { findCursorById } from "./cursor-utils";

export const cursors = []
export const otherCursors = [];

export function drawCursorLabels(pdfDoc: CustomPDFDocument) {
    for (const cursor of cursors) {
      // Draw label next to the cursor
      pdfDoc.fontSize(LABEL_FONT_SIZE).text(cursor.username, cursor.x, cursor.y);
    }
  }
  
  // Real-time update for cursor labels
  socket.on('broadcast-cursor-update', (updatedCursor) => {
    const existingCursor = findCursorById(updatedCursor.id);
    if (existingCursor) {
      // Update the cursor information
      existingCursor.username = updatedCursor.username;
      existingCursor.x = updatedCursor.x;
      existingCursor.y = updatedCursor.y;
    }
  });
  