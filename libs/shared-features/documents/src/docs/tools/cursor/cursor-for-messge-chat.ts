import { socket } from "libs/backend/data-access/src/socket/socket";

// Pseudo code for Cursor Chat Integration
const chatMessages = [];

function sendMessage(message) {
  const chatMessage = { userId: currentUser.id, message, timestamp: Date.now() };
  chatMessages.push(chatMessage);

  // Broadcast the chat message to other collaborators in real-time
  socket.emit('broadcast-chat-message', chatMessage);
}

socket.on('broadcast-chat-message', (chatMessage) => {
  // Receive and display chat messages from other users
  displayChatMessage(chatMessage);
});
