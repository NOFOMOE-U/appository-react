import fs from 'fs';
import PDFKit from 'pdfkit';
import { MyOptions } from '../middleware/permissions/shield/my-options.interface';

export async function generatePDF(documentContent: string,options: MyOptions, filePath: string): Promise<void> {
  const pdfDoc = new PDFKit();
  
  // Add content to the PDF
  pdfDoc.text(documentContent);
  
  // Pipe the PDF content to a writable stream (file)
  pdfDoc.pipe(fs.createWriteStream(filePath));
  
  // Finalize the PDF and close the stream
  pdfDoc.end();
}






  // Create a .sql file
  // November 11, 2023
  // This conversation may reflect the link creator’s personalized data, which isn’t shared and can meaningfully change how the model responds.
  // how do I create a dot sql file?
  // ChatGPT
  // To create a .sql file:
  
  // Choose an Editor: Use a text editor like Notepad, Notepad++, Sublime Text, or a dedicated SQL editor.
  // Write SQL Code: Write your SQL queries or scripts.
  // Save the File:
  // Go to File > Save As.
  // Name your file with the .sql extension, like script.sql.
  // Choose All Files in the 'Save as type' dropdown.
  // Select the location to save and click Save.
  // This .sql file can now be used to run queries in SQL-compatible database systems.
  
  // I'm using a SQL IDE called beekeeper. it's extremely lightweight and I don't think it gives me the option to save my queries as a SQL file. should I just copy-paste my queries into another file?
  // ChatGPT
  // Yes, in the absence of a direct save option in Beekeeper Studio for your SQL queries, the practical workaround is to copy-paste your queries into a text editor and save them as .sql files. Follow these steps:
  
  // Copy Queries: Select and copy your SQL queries from Beekeeper Studio.
  // Open Text Editor: Open a text editor like Notepad, Notepad++, or any other preferred editor.
  // Paste Queries: Paste the copied SQL queries into the text editor.
  // Save as .sql:
  // Navigate to File > Save As.
  // Name your file with the .sql extension (e.g., queries.sql).
  // In the 'Save as type' dropdown, select All Files.
  // Choose your desired location and click Save.
  // This process will create a .sql file with your queries, which can be opened, edited, or executed in any SQL-compatible environment.



export  function generateDocx(document: string) {
    // Logic to generate a .docx file from the provided document
    // For example, using 'docx' or 'mammoth' library
    // Example:
    // const doc = new Document();
    // doc.createParagraph().addRun(document: string);
    // docx.Packer.toBlob(doc).then((blob) => {
    //   saveAs(blob, 'document.docx');
    // });
  }





  
export  function generateRTF(document: string) {
    // Logic to generate a .rtf file from the provided document
    // Using libraries like 'rtf-js'
    // Example:
    // rtf.save('document.rtf', document);
  }
  
