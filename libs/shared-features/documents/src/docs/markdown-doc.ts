import errorMessages from '@appository/backend/data-access'
import fs from 'fs'
import TurndownService from 'turndown'
import { Attachment } from '../../attachments'
import { DocumentOptions } from '../PDFDocuments'
import { BaseDocument } from './base-document'


type CustomUserCreatedMarkdownDocument = Document & MarkdownDocument

export class MarkdownDocument extends BaseDocument  implements MarkdownDocument {
  attachments: any
  constructor(options: DocumentOptions) {
    super(options)
  }

 
  // Markdown document properties and methods...
  id: number
  documentId: number
  title: string
  author: string
  content: string
  htmlContent: string
  filePath: string

  // Example method to convert Markdown to HTML
  async convertToHTML(markdown: string): Promise<string> {
    const content = (this.htmlContent = convertMarkdownToHTML(markdown))
    console.log(`Converting Markdown to HTML: ${markdown}`)
    return content
  }

  async getTitleByName(title: string): Promise<string> {
    try {
      const documentTitle = title
      return documentTitle
    } catch (error) {
      return errorMessages.noAuthorFound
    }
  }
  async getTitleById(documentId: number): Promise<string> {
    try {
      const title = await this.getTitleById(documentId)
      return title
    } catch {
      return errorMessages.authorNotFound
    }
  }

  async getTitle(title: string): Promise<string> {
    try {
      const theTitle = await this.getTitleByName(title)
      return theTitle
    } catch (error) {
      errorMessages.authorNotFound
    }
  }
  async getAuthor(username: string): Promise<string> {
    const user = await this.getAuthor(username)
    return user
  }

 
  async printInfo(): Promise<string> {
    console.log(`Printing ${this.constructor.name} document information: ${this.title}`)
    return new Promise<string>((resolve, reject) => {
      resolve('Printed successfully');
    })
  }

  async addText(text: string): Promise<string> {
    this.content + text
    return this.content
  }

  async save(filePath: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, (error) => {
        if (error) {
          reject(error)
        } else {
          this.filePath = filePath
           console.log(`Document saved successfully at ${filePath}`)

          resolve()
        }
      })
    })
  }
  

  async addAttachment(attachment: Attachment): Promise<void> {
    // Logic to add attachment
    return new Promise<void>((resolve, reject) => {

      setTimeout(() => {
        this.attachments.push(attachment);
        console.log(`Attachment added to the document: ${attachment}`);
        resolve();
      }, 1000); // Simulating an asynchronous operation with setTimeout
    });
  }
  

  // Markdown-specific properties and methods
  convertToMarkdown(html: string): string {
    const turndownService = new TurndownService()
    return turndownService.turndown(html)
  }
}

export function createMarkdownDocument(content: string): MarkdownDocument {
  // Implementation for creating a Markdown document

  // Convert markdown content to html
  const htmlContent = convertMarkdownToHTML(content)

  // Return the MarkdownDocument with content and htmlContent
  return { content, htmlContent } as MarkdownDocument
}

export function convertMarkdownToHTML(markdown: string): string {
  // Implementation to convert markdown to HTML
  // For simplicity, the implementation just returns the input markdown as HTML
  return markdown
}

// // Example usage:
// const markdownContent = '# Hello, Markdown!';
// const markdownDoc = createMarkdownDocument(markdownContent);

// // Accessing the created Markdown document
// console.log('Markdown Content:', markdownDoc.content);
// console.log('HTML Content:', markdownDoc.htmlContent);
