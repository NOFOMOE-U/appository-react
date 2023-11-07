//Users/dixiejones/Development/main-app/appository-react/apps/backend/api/src/main.ts
import { CustomRequestWithContext, LoggingMiddleware, MyContext, MyCustomRequest, UserService, YourRequestObject, initContext } from '@appository/backend/data-access'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { CustomContextType } from 'libs/backend/data-access/src/context/custom-context-type'
import { BodyContent } from 'libs/backend/data-access/src/make-api/requests/custom-request-init'
import { AppModule } from './app/app.module'


async function bootstrap() {
  const req = {} as CustomRequestWithContext<MyContext<YourRequestObject<CustomContextType>>>

  //initial the context using init
  let userService: UserService
  let requestBody: BodyContent | null | undefined

  const myContext = await initContext(req)

  // Fixed error by changing userService to requestBody
  const myRequest = new MyCustomRequest(myContext, requestBody, userService )

  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)

  // todo add headless check
  // // Check if HEADLESS mode is enabled
  // Check if HEADLESS mode is enabled
  // if (config.headless) {
  //   // Run in HEADLESS mode
  //   // Additional code for headless mode

  //   // Background task for milestone tracking
  //   const teams = fetchTeamsToTrackMilestones();

  //   teams.forEach((team) => {
  //     const milestones = fetchMilestonesForTeam(team);
  //     milestones.forEach((milestone) => {
  //       if (milestone.isAchieved()) {
  //         sendNotificationToTeam(team, milestone);
  //         updateProgressForMilestone(milestone);
  //       }
  //     });
  //   });

  //   console.log("Running in HEADLESS mode for milestone tracking.");
  // } else {
  //   // Run in non-HEADLESS mode
  //   // Additional code for non-headless mode

  //   // Your app's main functionality, including user interactions and chats
  //   const userInteractions = listenForUserInteractions();

  //   console.log("Running in non-HEADLESS mode for user interactions.");
  // }

  //#TODO
  // const { default: graphqlUploadExpress } = await import(
  //   'graphql-upload/graphqlUploadExpress.mjs'import { permissions } from '../../../../libs/backend/data-access/src/middleware/permissions/permissions';

  // app.use(graphqlUploadExpress(configService.get<IUploaderMiddlewareOptions>('uploader.middleware')));
  // https://dev.to/tugascript/nestjs-graphql-image-upload-to-a-s3-bucket-1njg
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  app.use(LoggingMiddleware.createMiddleware(new LoggingMiddleware()))

  //Enable CORS and body pargins middleware as needed
  const port = process.env.PORT || 3333
  await app.listen(port, () => {
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
    Logger.log(`Running in ${config.get('environment')} mode`)
  })
}

  

bootstrap()









// // TODO
// Chat Notifications: Automatically send chat notifications based on user preferences and interactions.

// Video Call Scheduler: Schedule and manage video calls for teams or individuals.

// Text Messaging Scheduler: Automate the sending of text messages or reminders.

// Team Assignment Automation: Automatically assign tasks and projects to teams based on predefined rules.

// Milestone Tracking: Automatically track and update milestones as tasks are completed.

// File Backup and Sync: Backup and synchronize user files and data.

// Team Meeting Scheduler: Automatically schedule team meetings based on team availability.

// User Activity Tracking: Monitor and log user activity for analytics and reporting.

// User Notifications: Send automated notifications to users for various events.

// User Analytics: Collect and analyze user data for productivity insights.

// Team Performance Analytics: Monitor and analyze team performance.

// User Engagement Metrics: Track user engagement and suggest improvements.

// Team Collaboration Reports: Generate reports on team collaboration metrics.

// Automated User Surveys: Conduct user surveys to gather feedback and suggestions.

// User Onboarding Wizard: Create a user onboarding flow for new users.

// Auto-Assign Support Tickets: Assign user support tickets to the appropriate teams.

// Content Recommendations: Suggest relevant content to users based on their activities.

// Automated Content Sharing: Share user-generated content across teams or with specific users.

// Password Management: Automate password reset and management processes.

// User Profile Updates: Automatically update user profiles based on user interactions.

// Task Prioritization: Automatically prioritize tasks based on user preferences.

// User-Generated Content Moderation: Automate the moderation of user-generated content.

// User Permission Management: Manage user permissions and access control.

// User Role Assignment: Automatically assign roles to users based on their activities.

// User Account Cleanup: Remove inactive or redundant user accounts.

// Team Resource Allocation: Automatically allocate resources to teams.

// Team Performance Tracking: Continuously track and analyze team performance.

// User Data Export: Allow users to export their data for personal use.

// User Data Import: Enable users to import data from external sources.

// Feedback Loop Management: Automate the process of gathering and responding to user feedback.

// These tools can help streamline and enhance various aspects of your productivity app, making it more efficient and user-friendly. However, the actual implementation of each tool will require specific development and integration work, and you may need to customize them based on your app's unique requirements.