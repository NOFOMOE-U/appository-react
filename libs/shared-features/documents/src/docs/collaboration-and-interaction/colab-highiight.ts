
  // Pseudo code for HighlightData
  export interface HighlightData {
    x: number; // X-coordinate of the highlight
    y: number; // Y-coordinate of the highlight
    width: number; // Width of the highlight
    height: number; // Height of the highlight
    color: string; // Color of the highlight (optional, default: 'yellow')
    userId: string; // Unique identifier for the user
  }
  
  // Pseudo code for CommentData
 export  interface CommentData {
    x: number; // X-coordinate of the comment
    y: number; // Y-coordinate of the comment
    content: string; // Content of the comment
    userId: string; // Unique identifier for the user
  }
  