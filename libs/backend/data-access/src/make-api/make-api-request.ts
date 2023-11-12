import { MyContext } from '../context/my-context'
import { ExtendedCustomRequest } from '../interfaces/user/custom-request'
import errorMessages from '../middleware/permissions/error-messages'
import { RequestOptions, getDefaultAxiosOptions } from './default-options'
import { CustomRequestWithContext } from './requests/custom-request-with-context'
// import {
//   generatePDF,
//   generateDocx,
//   generateMarkdown,
//   generateRTF,
//   shareViaCloudStorage,
//   shareViaCollaborationTool,
//   shareViaDocumentHosting,
// } from '../generate-docs/generate-pdf'

export type ApiRequestFunction = (endpoint: string) => Promise<string>

interface APIRequestOptions extends RequestOptions {
  // Add or override properties if needed specifically for API calls

  additionalProperty?: string
}

export async function makeApiRequest(
  endpoint: string,
  req: CustomRequestWithContext<MyContext<{}>>,
  apiRequestFunction: ApiRequestFunction,
) {
  // Create an instance of ExtendedCustomRequest using defaultOptions
  const options = getDefaultAxiosOptions(req) as unknown as ExtendedCustomRequest
  // Add any additional headers/params as needed
  try {
    // Use axios to make a GET request to the API endpoint
    const responseData = await apiRequestFunction(endpoint)

    // Process the responseData as needed
    console.log(responseData)


    // todo doc generation
    // // Generate PDF
    // generatePDF(responseData)

    // // Generate .docx
    // generateDocx(responseData)

    // // Generate .md
    // generateMarkdown(responseData)

    // // Generate .rtf
    // generateRTF(responseData)

    // // Share via Cloud Storage
    // shareViaCloudStorage(responseData, 'Google Drive')

    // // Share via Collaboration Tool
    // shareViaCollaborationTool(responseData, 'Google Docs')

    // // Share via Document Hosting
    // shareViaDocumentHosting(responseData, 'Example Hosting Service')

    const downloadLink = document.createElement('a')
    downloadLink.href = 'https://example.com/api/users'
    downloadLink.download = 'data.json'
    downloadLink.click()
  } catch (error) {
    console.log('Request Error: ', errorMessages.requestError)
  }
}

// todo frontend start todo for doc dgeenerations
// In your frontend code, create a button or link that triggers the makeApiRequest function when clicked.

// When the API request is successful, it will trigger the download of the response data as a file (in this example, 'data.json'). You can customize the file name and format according to your needs.

// Ensure that the API endpoint URL and the desired file name are set correctly in the downloadLink.

// This way, when users interact with your frontend and trigger the API request, they can download the response data as a file.

// Please note that you'll need to handle the interaction between the frontend and the makeApiRequest function according to your app's user interface and user experience. The example above demonstrates the process of triggering the download in response to the API request success.
