// routes.ts

import { Request, Response } from 'express';
import { generatePDF } from '../../generate-docs/generate-pdf';
import { MyOptions } from '../../middleware/permissions/shield/my-options.interface';


// Create a function to generate MyOptions
export function createMyOptions(userId: string, customProperties: Record<string, string> = {}): MyOptions {
  // Set user-specific file path in the options
  const userFilePath = `/user/${userId}/generated-pdfs`;

  // You can add other default properties or customize them based on your needs
  return {
    ...customProperties,
    userFilePath,
    // ...other properties
  } as MyOptions;
}




export function handleGeneratePDF(req: Request, res: Response, filePath: string, options: MyOptions): void {
  // Extract user information from the request
  const userId = req.user.id; // Replace with your actual user identification logic

  
  // Process the PDF generation using the provided options
  generatePDF(req.body.documentContent, createMyOptions(userId), filePath);

  // Send a response or handle further actions...
}
