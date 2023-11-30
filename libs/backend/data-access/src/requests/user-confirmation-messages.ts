import { getUserByName } from "../utils/backend-auth.utils";
import { generateConfirmationMessage } from "./confirmation-messages";

const userConfirmationMessages = {
    documentTransferOwnership: async (userId: string, document: Document, user: string) => {
      return generateConfirmationMessage({ userId, document, userVariable: 'username' });
    },
    emailUnique: async () => {
      const userName = await getUserByName(); // Replace with actual logic
      return `${userName}, the email is unique and not already registered.`;
    },
    // Add more user-related confirmation messages as needed
  };
  
  export default userConfirmationMessages;
  