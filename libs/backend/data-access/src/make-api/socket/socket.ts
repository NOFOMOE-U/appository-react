import { Socket } from "socket.io";

export let specificSocket: SpecificSocketType | null = null;

// Define a SpecificSocketType
export type SpecificSocketType = Socket & {
    id: string;
    connect: () => void;
    send: (data: string) => void;
    on: (event: string, callback: (data: any) => void) => void;
    handshake:{
        address: string;
    }
    // Add other properties and methods specific to your socket
    remoteAddress: string
}

export const connection: SpecificSocketType | null = specificSocket
export const socket: SpecificSocketType | null = specificSocket














// import { Socket, Namespace } from 'socket.io'; // Import the Socket and Namespace types from the correct module

// // Create a function or object that encapsulates your code
// function initializeSocket() {
//     // ...
  
//     // Your existing code
//     const nsp = socketio.of('/yourNamespaceName');
//     const client = nsp.connected['yourSocketId'];
//     const auth = {
//       username: 'yourUsername',
//       token: 'yourAuthToken',
//     };
//     const previousSession = {
//       sessionId: 'yourPreviousSessionId',
//       sessionData: 'yourPreviousSessionData',
//     };
  
//     const socket = new Socket(nsp, client, auth, previousSession);
  
//     // Return the socket instance or any other relevant data
//     return socket;
//   }
  
//   // Export the function or object
//   module.exports = initializeSocket;
  



// #todo-socket
// For a productivity and project management app that includes communication features such as chat, video, and audio, you may need various properties and methods for your SpecificSocketType to facilitate effective communication and collaboration. Here are some essential properties and methods to consider:

// Properties:

// id: A unique identifier for each user or team using the socket.

// username: The username or display name of the user or team associated with the socket.

// status: The online or offline status of the user or team.

// teams: An array of teams or projects the user is a member of.

// notifications: A list of notifications or unread messages for the user or team.

// preferences: User or team-specific preferences for the communication features (e.g., notification settings, theme preferences).

// lastActivity: A timestamp indicating the last activity or interaction using the socket.

// isTyping: A flag to indicate if the user or team is currently typing a message.

// Methods:

// connect: Establish a connection to the server when the app starts or when the user logs in.

// disconnect: Terminate the socket connection when the app is closed or when the user logs out.

// sendMessage(message: string): Send a text message to an individual or a team.

// sendFile(file: File): Send files or attachments to other users or teams.

// startVideoCall(): void: Initiate a video call with another user or within a team.

// startAudioCall(): void: Initiate an audio call with another user or within a team.

// joinTeam(teamId: string): void: Join a specific team or project group.

// leaveTeam(teamId: string): void: Leave a team or project group.

// setStatus(status: string): void: Update the online/offline status.

// setPreferences(preferences: object): void: Update user-specific preferences.

// getNotifications(): Notification[]: Retrieve a list of notifications.

// markNotificationAsRead(notificationId: string): void: Mark a notification as read.

// getChatHistory(withUserOrTeam: string): ChatMessage[]: Retrieve the chat history with a specific user or team.

// getTeamMembers(teamId: string): User[]: Retrieve a list of team members for a given team.

// setTypingStatus(isTyping: boolean): void: Update the typing status.