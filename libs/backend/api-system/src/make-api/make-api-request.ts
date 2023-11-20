import { Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import path from 'path'
import { ParsedQs } from 'qs'
import { MyContext } from '../context/my-context'
import { generatePDF } from '../docs/doc-generator/generate-pdf'
import { generateMarkdown } from '../docs/generate-markdown'
import { CustomPrismaClient } from '../lib/prisma/prisma'
import errorMessages from '../middleware/permissions/error-messages'
import { MyOptions } from '../middleware/permissions/shield/my-options.interface'
import { RequestOptions, getDefaultAxiosOptions } from './default-options'
import { CustomRequestWithContext } from './requests/custom-request-with-context'

const filePath = path.join(__dirname, 'output.pdf') // define the file path

export type ApiRequestFunction = (endpoint: string) => Promise<string>

interface APIRequestOptions extends RequestOptions {
  // Remove the index signature to avoid the errors
  ctx: {
    headers: {
      [key: string]: string | string[] | undefined
    }
    accessToken?: string | undefined
  }

  headers: {
    [key: string]: string | string[] | undefined
  }

  prisma: CustomPrismaClient

  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
  method: 'GET'
  // Keep the optional additional property
  additionalProperty?: string | undefined
}

type CustomContextRequestSearchOptions = CustomRequestWithContext<MyContext<{}>> & APIRequestOptions

export async function makeApiRequest(
  endpoint: string,
  req: APIRequestOptions,
  options: MyOptions,
  apiRequestFunction: ApiRequestFunction,
) {
  if (req.method === 'GET') {
    // Create an instance of ExtendedCustomRequest using defaultOptions
    const axiosOptions = getDefaultAxiosOptions(req as CustomContextRequestSearchOptions)
    return axiosOptions
  }
  // Add any additional headers/params as needed
  try {
    // Use axios to make a GET request to the API endpoint
    const responseData = await apiRequestFunction(endpoint)

    // Process the responseData as needed
    console.log(responseData)

    // // Generate PDF
    generatePDF(responseData, options, filePath)

    // // Generate .md
    generateMarkdown(responseData, filePath)

    // todo doc generation for docx and rtf
    // // Generate .docx
    // generateDocx(responseData)

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
