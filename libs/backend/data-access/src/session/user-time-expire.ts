const inactivityTimeoutInMinutes = 15; // Set the inactivity timeout to 15 minutes
const currentTime = new Date();
export const expirationTime = new Date(currentTime.getTime() + inactivityTimeoutInMinutes * 60000); // Convert minutes to milliseconds

// // Update the expiration time in the session
// context.session.expires = expirationTime;
