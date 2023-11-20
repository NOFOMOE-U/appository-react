import { PrismaClient } from "@prisma/client";
import markdown from 'markdown-it';

interface MarkdownDocument {
  id: string;
  title: string;
  content: string;
  htmlContent: string;
  convertToHTML(markdown: string): void;
  getTitle(): string
}

class MarkdownDocumentImpl implements MarkdownDocument {
  id: string;
  title: string;
  content: string;
  htmlContent: string;
  getTitle(): string {
    return this.title
  }

  constructor(id: string, title: string, content: string, htmlContent: string) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.htmlContent = htmlContent;
  }

  print(): void{
    console.log(`Content: ${this.content} generated for ${markdown}`);
  }



  

  convertToHTML(markdown: string): void {
    // Implementation for converting Markdown to HTML
    console.log(`Converting Markdown to HTML: ${markdown}`);
  }
}

const prisma = new PrismaClient();

export async function getDocumentById(documentId: number): Promise<MarkdownDocument | null> {
  try {
    
    const document = await prisma.document.findUnique({
      where: {
        id: documentId,
      },
    });

    if (document) {
      return new MarkdownDocumentImpl(
        document.id.toString(),
        document.title,
        document.content,
        'defaut-doc-value' // Add a default placeholder
      );
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error retrieving document by ID:', error);
    throw new Error('Failed to retrieve document');
  }
}

// Example usage
const documentId = 123; // Replace with the actual document ID
const markdownDocument = await getDocumentById(documentId);

if (markdownDocument) {
  console.log(markdownDocument.getTitle()); // Assuming getTitle is implemented
  markdownDocument.convertToHTML('Your Markdown Content');
}
