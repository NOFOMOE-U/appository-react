import { Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { MarkdownDocument } from 'libs/shared-features/documents/src/PDFDocuments';
import { MyContext } from '../../../context/my-context';
import { getDocumentById } from '../../../docs/get-document-by-id';
import { app } from '../../../server';
import { YourRequestObject } from '../../requests/custom-request-with-context';
// import { getDocumentById, saveOrUpdateDocument } from '../database/document';
// Example usage in an Express route handler
app.post('/create-update-document', async (req: YourRequestObject<MyContext>, res: Response, next: NextFunction) => {
    const { documentId, title, content } = req.body;
  
    // Check if the document already exists
    const existingDocument = await getDocumentById(documentId);
  
    if (existingDocument) {
      // Update existing document
      existingDocument.title = title;
      existingDocument.content = content;
      await saveOrUpdateDocument(existingDocument);
    } else {
      // Create a new document
      const newDocument: MarkdownDocument = {
        id: documentId,
        title,
        content,
      };
      await saveOrUpdateDocument(newDocument);
    }
  
    res.status(200).json({ message: 'Document saved successfully' });
  });