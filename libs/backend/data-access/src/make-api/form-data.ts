import { User } from '@prisma/client'
import { AppConfiguration } from '../context/app-configuration'
import { CustomURLSearchParams, MyContext } from '../context/my-context'
import { convertUserToUserWithAccessToken } from '../interfaces/auth/authenticate'
import prisma from '../lib/prisma/prisma'
import { UserWithAccessToken } from '../modules/user/user'

import { CustomRequest } from '../interfaces/user/custom-request'
import { PrismaService } from '../lib/prisma/prisma.service'
import { UserWithoutSensitiveData } from '../modules/user/user'
import { UserService } from '../modules/user/user.service'
import { getUserId } from '../utils/backend-auth.utils'
import { myContext } from './default-options'
import { CustomSessionType, MyCustomRequest } from './my-custom-request'
import { BodyContent, CustomRequestInit, CustomRequestOptions } from './requests/custom-request-init'
import { CustomRequestWithContext, YourRequestObject } from './requests/custom-request-with-context'


type UserLoginSessionType = CustomRequestWithContext<CustomRequestInit>
  & UserWithAccessToken

let userService: UserService
let prismaService: PrismaService = new PrismaService()
let requestBody: BodyContent | null | undefined


const headers = new Headers()

//define your headers as key-value pairs in an object

const customHeaders: { [key: string]: string } = {}

type MyCustomContext = MyContext<UserWithoutSensitiveData> & {
  accepts: (types: string | string[]) => string[]
  signedCookies: Record<string, string> // Update this with the correct type for your signed cookies
  get?: (name: string) => string | undefined
}
  
const updateRequest = new MyCustomRequest<MyCustomContext>(
  {
    user: {
      passwordHash: undefined,
    } as UserWithAccessToken,
    accessTier: {} as CustomRequestOptions['accessTier'],
    body: {} as BodyInit | null | undefined,
    userService: {} as UserService,
    requestBody: {} as BodyContent | null | undefined,
    request: {} as YourRequestObject<CustomRequestInit>,
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'GET',
    get: (name: string) => {
      if (name === 'set-cookie') {
        const value = customHeaders[name]
        return value ? value : undefined
      }
      return customHeaders[name] || undefined
    },
    headers: customHeaders,
    URLSearchParams: {} as CustomURLSearchParams,
    accepts: (types: string | string[] | undefined) => {
      if (typeof types === 'string') {
        return [types]
      }
      if (Array.isArray(types)) {
        return types
      } else {
        return ['']
      }
    },
    session: {
      user: {} as UserLoginSessionType,
      userId: getUserId() as unknown as string,
      username: myContext?.session.username as string,
      currentUser: convertUserToUserWithAccessToken({} as User),
      yourSessionKey: myContext?.session.yourSessionKey as string,
      expires: Date.now(),
    },
    context: {
      ...myContext,
      id: '',
      size: 0,
      url: '',
      URLSearchParams: {} as CustomURLSearchParams,
      userService: {} as UserService,
      user: {} as  UserWithAccessToken,
      signedCookies: {} as Record<string, string>,
      config: {} as AppConfiguration,
      req: {} as YourRequestObject<CustomRequestInit>,
      cookie: {} as string | undefined,
      cookies: {} as Record<string, string>,
      token: undefined,
      accessToken: null,
      request: {} as CustomRequest<{}>,
      prisma,
      context: {} as MyContext,
      currentUser: {} as UserWithAccessToken | null, // Added null to allow currentUser to be undefined
      ctx: {} as UserWithAccessToken,
      session: {} as CustomSessionType,
      cache: {} as RequestCache,
      accessTier: myContext?.accessTier,
      get: (name: string) => undefined,
      accepts: (types: string | string[] | undefined) => {
        if (typeof types === 'string') {
          return [types]
        }
        if (Array.isArray(types)) {
          return types
        }
        return []
      },
      // Added default value for customProp to fix error
      customProp: myContext?.customProp,
    },
    config: {} as AppConfiguration,
  },
  userService = new UserService(prismaService, accessTier),
  myContext,
)


updateRequest.context = { hello: 'world' }

// 1 how to get form data
const formData = new FormData()


formData.append('request', JSON.stringify(updateRequest))
formData.append('session', JSON.stringify(updateRequest.session))
formData.append('context', JSON.stringify(updateRequest.context))

//if you want to send form data in request body
formData.append('key1', 'value1')
formData.append('key2', 'value2')

updateRequest.requestBody = formData

updateRequest.body = updateRequest.requestBody

// //2.
// // for json Data
// const jsonContent = {
//   key1: 'value1',
//   key2: 'value2'
// }

// updateRequest.requestBody = jsonContent
// updateRequest.body = updateRequest.requestBody

// //3.
// //for Plain Text:

// const plainText = 'this is the request body content;

// //assign the pain text content to the requesBody
// updateRequest.requestBody = plainText

// //no further conversiion needed, you can directly assing requestBody to body
// updateRequest.body = updateRequest.requestBody

//#todo
// File Uploads: Allow users to upload files and documents related to their projects. You can use FormData to construct requests for file uploads. Users can attach project documents, images, or any other files relevant to the product management tasks.

// Chat Attachments: In your chat feature, provide the ability for users to attach files, images, or other media to their chat messages. The FormData can be used to send the attached files to the server, which will store and manage them for later retrieval.

// Collaborative Editing: If your product management app includes collaborative document editing (e.g., Google Docs-style collaboration), you can use FormData to send changes made by users. This can include text edits, formatting changes, or uploaded files.

// Bug/Issue Tracking: When users report bugs or issues with a product, they can attach screenshots or screen recordings to better describe the problem. FormData is helpful for sending this media to your server.

// User Profiles: Allow users to upload profile pictures. FormData can be used to update user profile information, including avatar images.

// Audio and Video Messages: If your app supports audio and video messaging, FormData can be used to transmit these media files to other users. The app can capture, encode, and send audio and video recordings to other users or teams.

// Comment Attachments: When users comment on a project or task, they might want to attach files to elaborate on their comments. FormData can be used to send both the comment text and the attached files.

// Version Control: If your product management app involves version control for documents or code, FormData can help in uploading new versions or changes to the server.

// Project Milestones: Users can upload images, videos, or documents to showcase project milestones or achievements. These media files can be part of project timelines or status updates.

// Knowledge Sharing: Allow users to share knowledge resources, such as PDF documents, videos, or links to external resources. FormData can be used to send these resources to others.

// Polls and Surveys: If your app includes the ability to create polls or surveys, FormData can be used to send user responses, including text input or uploaded files, to the survey creator.

// Export and Reporting: Users may need to export data or reports generated within the app. FormData can help in transmitting these exported files to users' email addresses or cloud storage.

// File Uploads: The FormData object can be extended to include file uploads alongside other data.

// Chat Attachments: Attachments in chat messages can be included within the FormData object.

// Collaborative Editing: You can use FormData to send collaborative edits or documents to the server.

// Bug/Issue Tracking: This code can accommodate attachments for bug reports.

// User Profiles: User avatars and profile information can be uploaded with FormData.

// Audio and Video Messages: Audio and video messages can be sent using this method.

// Comment Attachments: Comments can include both text and attached files.

// Version Control: Document versions and changes can be transmitted using FormData.

// Project Milestones: Images, videos, and documents related to project milestones can be added.

// Knowledge Sharing: Sharing PDFs, videos, or links can be implemented with this code.

// Polls and Surveys: User responses, including text inputs or uploaded files, can be sent.

// Export and Reporting: Data or reports generated within the app can be added to FormData.

// Your code provides a flexible foundation for handling various data types, and you can expand upon it to meet the specific needs of your product management app. Be sure to handle security considerations and data validation appropriately, especially when dealing with user-generated content or file uploads.
