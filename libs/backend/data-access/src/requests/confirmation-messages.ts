import { getUserById } from '@appository/backend/users';
import { systemConfirmationMessages } from './system-success-messages';
import userConfirmationMessages from './user-confirmation-messages';

interface ConfirmationMessageParams {
  userId: string
  document: Document
  userVariable: string
}

export const generateConfirmationMessage = async ({
  userId,
  document,
  userVariable
}: ConfirmationMessageParams) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return `You transferred ${document.title} to ${
    (user as any)[userVariable as string]
  }. This change will be visible to all collaborators.`;
};

const confirmationMessages = {
  ...userConfirmationMessages,
  ...systemConfirmationMessages,
};

export default confirmationMessages;
