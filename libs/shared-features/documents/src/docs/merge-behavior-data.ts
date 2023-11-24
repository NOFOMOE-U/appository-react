
import userBehaviorData from '../middleware/logging/logging-behavior';

export const mergeUserBehaviorData = (userProfileReport:any, behaviorData: any) => {
    // Merge specific behavior data into the user profile report
    userProfileReport.behaviorData = userBehaviorData; // Assumes 'behaviorData' holds the userBehaviorData information
  
    return userProfileReport;
  };
