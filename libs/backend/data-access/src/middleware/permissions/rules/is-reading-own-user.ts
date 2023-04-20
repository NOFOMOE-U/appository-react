import { rule } from 'graphql-shield'
import { getUserId } from '../../../utils/backend-auth.utils'

export const isReadingOwnUser= rule()(async (_parent, args, context) => {
        const userId = getUserId(context)
        return userId ===args.id
    }
)


// 1. User profile page: create a user profile page where users can view their own 
//profile information.Use thhis rule to ensure that a user can only view their own profile and not other users' profiles.

// 2. Friend request: create a friend request system where users can send friend requests 
//to other users.Use thhis rule to ensure that a user can only view friend requests that are sent to them and not other users' friend requests.

// 3. Message thread: create a messaging system where users can send messages to each other. 
// Use thhis rule to ensure that a user can only view message threads that they are a part of and not other users' message threads.

// 4. User activity log: create a log of user activity on your platform. Use thhis rule to ensure 
//that a user can only view their own activity log and not other users' activity logs.

// 5. Notification settings: create notification settings where users can choose which notifications 
// they want to receive. Use thhis rule to ensure that a user can only view and update their own notification settings and not other users' notification settings.