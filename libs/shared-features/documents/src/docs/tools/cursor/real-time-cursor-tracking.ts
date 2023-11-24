import { socket } from 'libs/backend/data-access/src/server'
import { CollaborationOptions } from '../../collaboration-and-interaction/colab-document-interfaces'
import { CustomPDFDocument } from '../../custom-pdf-document'

// Pseudo code for Real-time Updates

// Pseudo code for CursorPosition
export interface CursorPosition {
  x: number // X-coordinate of the cursor
  y: number // Y-coordinate of the cursor
  userId: string // Unique identifier for the user
  color: string
  userName: string
  fontSize: number
}

export function displayCursorWithOptiions(
  pdfDoc: CustomPDFDocument,
  collaborationOptions: CollaborationOptions,
  cursorPositions: CursorPosition[],
  showNames: boolean,
  fontSize: number,
): void {
  ;(fontSize = 12), (showNames = true)
  for (const cursor of cursorPositions) {
    pdfDoc.fillColor(cursor.color).cursor(cursor.x, cursor.y, 5).fill()

    if (showNames) {
      pdfDoc.fontSize(cursor.fontSize || fontSize).text(cursor.userName, cursor.x, cursor.y)
    }
  }
}

export function scrollToCursor(pdfDoc: CustomPDFDocument, cursor: CursorPosition): void {
  const scrollContainer = document.getElementById('scro')
  if (scrollContainer) {
    scrollContainer.scrollTo({
      top: cursor.y,
      left: cursor.x,
      behavior: 'smooth',
    })
  }
}

// Pseudo code for Cursor Trails
const cursorTrail = []

function updateCursorTrail(cursor) {
  // Add current cursor position to the trail
  cursorTrail.push(cursor)

  // Limit the trail length to a certain number of points
  if (cursorTrail.length > MAX_TRAIL_LENGTH) {
    cursorTrail.shift() // Remove the oldest point
  }
}

function drawCursorTrails(pdfDoc) {
  // Iterate through the cursor trail and draw lines
  for (let i = 1; i < cursorTrail.length; i++) {
    const prevCursor = cursorTrail[i - 1]
    const currentCursor = cursorTrail[i]

    pdfDoc.moveTo(prevCursor.x, prevCursor.y).lineTo(currentCursor.x, currentCursor.y).stroke()
  }
}

// Pseudo code for Cursor Collision Handling
function handleCursorCollision(cursor) {
  // Check for collisions with other cursors
  for (const otherCursor of otherCursors) {
    if (areCursorsColliding(cursor, otherCursor)) {
      // Adjust cursor position to prevent overlap
      cursor.x += COLLISION_ADJUSTMENT
      cursor.y += COLLISION_ADJUSTMENT
    }
  }
}

function areCursorsColliding(cursor1, cursor2) {
  // Implement logic to check if two cursors are colliding
  // You might compare the distance between the cursors to a threshold
  const distance = calculateDistance(cursor1, cursor2)
  return distance < COLLISION_THRESHOLD
}

function calculateDistance(cursor1, cursor2) {
  // Implement distance calculation logic (e.g., Euclidean distance)
  const dx = cursor1.x - cursor2.x
  const dy = cursor1.y - cursor2.y
  return Math.sqrt(dx * dx + dy * dy)
}

function sendCursorUpdate(cursor) {
  // Send cursor position to the server
  socket.emit('cursor-update', cursor)
}

// Server-side code (Node.js example)
socket.on('connection', (client) => {
  client.on('cursor-update', (cursor) => {
    // Broadcast the cursor update to all connected clients
    socket.emit('broadcast-cursor-update', cursor)
  })
})
