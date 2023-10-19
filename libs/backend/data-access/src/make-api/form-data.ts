import { MyContext } from "../context/my-context";
import { MyCustomRequest } from "./my-custom-request";

const headers = new Headers();

//define your headers as key-value pairs in an object

const customHeaders: {[key: string]: string} = {};

const updateRequest: MyCustomRequest<MyContext<MyContext>> = new MyCustomRequest<MyContext<MyContext>>({
  body: {} as any,
  url: 'https://jsonplaceholder.typicode.com/posts/1',
  method: 'GET',
  get: (name: string) => {
    if (name === 'set-cookie') {
      const value = customHeaders[name]
      return value ? value : undefined;
    }
    return customHeaders[name] || undefined
  },
  headers: customHeaders,
  accepts: (types: string | string[]) => [],
  session: {
    userId: '',
    username: '',
    expires: Date.now()
    
  },
  context: { foo: 'bar' },
  signedCookies: {},
});

updateRequest.context = { hello: 'world' };

const formData = new FormData();
formData.append('request', JSON.stringify(updateRequest));
formData.append('session', JSON.stringify(updateRequest.session));
formData.append('context', JSON.stringify(updateRequest.context));


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