import { cursors } from './cursor-labeling'

export function findCursorById(cursorId: number) {
  return cursors.find((cursor) => cursor.id === cursorId)
}
