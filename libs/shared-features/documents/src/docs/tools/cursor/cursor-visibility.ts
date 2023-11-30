import { cursors } from "./cursor-labeling";

// Pseudo code for Cursor Visibility Control
let cursorsVisible = true;

export function toggleCursorVisibility() {
  cursorsVisible = !cursorsVisible;
}

export function drawCursors(pdfDoc: PositonCursor) {
  if (cursorsVisible) {
    // Draw all visible cursors
    for (const cursor of cursors) {
      drawCursor(pdfDoc, cursor);
    }
  }
}







const validateAuthData = async (data: AuthDto) => {
  try {
    await authSchema.validate(data, { abortEarly: false });
    // Data is valid
    return true;
  } catch (error) {
    // Validation failed
    return false;
  }
};

