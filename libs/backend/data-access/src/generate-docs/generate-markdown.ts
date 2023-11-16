import fs from 'fs';

export function generateMarkdown(documentContent: string, filePath: string): void {
    // Write the document content to the markdown file
    fs.writeFileSync(documentContent, filePath);
  }
  