
import PDFKit from 'pdfkit';

export async function createDocument(content: string): Promise<PDFKit.PDFDocument> {
    const pdfDoc = new PDFKit()
    // Add content to the PDF, hande other configurations
    pdfDoc.text(content)
    return pdfDoc
  }
  
  