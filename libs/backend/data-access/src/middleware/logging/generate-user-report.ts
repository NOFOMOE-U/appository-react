import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to generate a user profile report

export const generateUserProfileReport = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      // Include necessary fields
      include: {
        settings: true,
        // Include other related tables or fields
      },
    });

    if (user) {
      // Structure user data into a report
      const userProfileReport = {
        Name: user.name as string,
        Email: user.email as string,
        Joined: user.createdAt as Date
        // Add more fields from the user settings or related models  
      };
  
      return userProfileReport;
    } else {
      console.error('User not found');
      return null;
    }
    
  } catch (error) {
    console.error('Error generating user profile report:', error);
    return null;
  }
};

