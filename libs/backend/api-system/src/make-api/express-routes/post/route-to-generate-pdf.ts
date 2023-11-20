import { Response } from "express";
import { MyContext } from "../../../context/my-context";
import { generatePDF } from "../../../docs/doc-generator/generate-pdf";
import { MyOptions } from "../../../middleware/permissions/shield/my-options.interface";
import { app } from "../../../server";
import { YourRequestObject } from "../../requests/custom-request-with-context";

// Example API request
app.post('/generate-pdf', async (
  req: YourRequestObject<MyContext>,
  res: Response,
  filePath: string,
  options: MyOptions
) => {
  // Extract user information from the request

  const userId = req.user?.id

  const timestamp = new Date().toLocaleString();
  const pdfFileDate = `${timestamp}_created.pdf`;
  // const pdfFilePath = path.join(__dirname, `/user/${userId}/generated-pdf/document.pdf`)

  // Process the PDF generation using the provided options
  generatePDF(req.body as string, options, filePath)

  // Send a response or handle further actions...
})

