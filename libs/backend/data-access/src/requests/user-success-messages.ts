

export const getUserSuccessMessages = async () => {
  return userSuccessMessages;
}

export const addUserSuccessMessage = async (message: string) => {
  interface UserSuccessMessages {
    [key: string]: string
  }

  const newMessages = {
    ...userSuccessMessages,
    [message]: message,
  }

  return newMessages
}

export const updateUserSuccessMessage = (key: keyof typeof userSuccessMessages, message: string) => {
  userSuccessMessages[key] = message
  return userSuccessMessages
}

export const deleteUserSuccessMessage = (key: keyof typeof userSuccessMessages) => {
  delete userSuccessMessages[key]
  return userSuccessMessages
}

const userSuccessMessages = {

    userRegistered: `User registration successful. You can now proceed forward.`,
    updateUserSuccess: `User information updated successfully.`,
    createUserSuccess: `New user created successfully.`,
    deleteUserSuccess: `User deleted successfully.`,
    // Add more user-related success messages as needed
  };
  
  export default userSuccessMessages;
  