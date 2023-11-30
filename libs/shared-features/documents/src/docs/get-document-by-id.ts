import { PrismaClient } from '@prisma/client'
import fs, { NoParamCallback } from 'fs'
import errorMessages from "libs/shared-features/reports/src/error-messagess"
import markdown from 'markdown-it'
import TurndownService from 'turndown'
import { Attachment } from '../../attachments'
import { convertMarkdownToHTML } from './convert-markdown-to'
import { MarkdownDocument } from './markdown-doc'

class MarkdownDocumentImpl implements MarkdownDocument {
  id: number
  title: string
  author: string
  content: string
  htmlContent: string
  filePath: string
  createdAt: Date
  updatedAt: Date
  getTitle(title: string): Promise<string> {
    const theTitle = this.getTitle(title)
    return theTitle
  }

  constructor(id: number, title: string, author: string, content: string, htmlContent: string, filePath: string) {
    this.id = id
    this.title = title
    this.author = author
    this.content = content
    this.htmlContent = htmlContent
    this.filePath = filePath
  }

  printInfo(info: string): Promise<string> {
    // Implementation for printing document information
    console.log(`Creating ${this.constructor.name} document information: ${this.title}`)
    return new Promise<string>((resolve, _rejects) => {
      console.log(`Created ${this.constructor.name} document information: ${this.title}`)
      resolve(info)
    })
  }

  addText(text: string): Promise<string> {
    return new Promise<string>((resolve) => {
      // Implementation for adding text to the document
      console.log(`Adding text: ${text}`)
      const addingText = this.content + text
      resolve(addingText)
    })
  }

  async save(content: string, filePath: string, options?: NoParamCallback): Promise<void> {
    console.log(`Saving document to: ${filePath}`)

    fs.writeFile(filePath, content, options)
    return
  }


  print(): void {
    console.log(`Content: ${this.content} generated for ${markdown}`)
  }

  async convertToHTML(markdown: string, searchValue: string, replaceValue: string): Promise<string>  {
    const content = (this.htmlContent = convertMarkdownToHTML(markdown))
    // Implementation for converting Markdown to HTML
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

  async getAuthor(username: string): Promise<string> {
    const user = await this.getAuthor(username)
    return user
  }

 


  async addAttachment(attachment: Attachment): Promise<void> {
    // Logic to add attachment
    return new Promise<void>((resolve, reject) => {

      setTimeout(() => {
        this.addAttachment(attachment)
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

const prisma = new PrismaClient()

export async function getDocumentById(documentId: number, type: string): Promise<MarkdownDocument | null> {
  try {
    const document = await prisma.document.findUnique({
      where: {
        id: documentId,
      },
    })

    if (document) {
      const markdownDocument: MarkdownDocumentImpl = {
        id: document.id.toString(),
        author: document.author,
        title: document.title,
        content: document.content,
        htmlContent: 'defaut-doc-value',
        filePath: 'defaut-file-path',
        createdAt: new Date(),
        updatedAt: new Date(),
        getTitle: function (title: string): Promise<string> {
          return new Promise<string>((resolve) => {
            resolve(title)
          })
        },
        printInfo(info: string): Promise<string> {
          return new Promise<string>((resolve) => {
            resolve(info)
          })
        },
        addText(text: string): Promise<string> {
          this.content + text
          return this.content
        },
        save(content: string, filePath: string, options?: fs.NoParamCallback): Promise<void> {
          throw new Error('Function not implemented.')
        },
        print(): void {
          throw new Error('Function not implemented.')
        },
        async convertToHTML(markdown: string, searchValue: string, replaceValue: string): Promise<string> {
          const newConvertedHTML = markdown.replace(searchValue, replaceValue)
          return newConvertedHTML
        },
        getTitleByName: function (title: string): Promise<string> {
          throw new Error('Function not implemented.')
        },
        getTitleById: function (documentId: number): Promise<string> {
          throw new Error('Function not implemented.')
        },
        getAuthor: function (username: string): Promise<string> {
          throw new Error('Function not implemented.')
        },
        addAttachment: function (attachment: Attachment): Promise<void> {
          throw new Error('Function not implemented.')
        },
        convertToMarkdown: function (html: string): string {
          throw new Error('Function not implemented.')
        }
      }
      return markdownDocument
    } else {
      return null
    }
  } catch (error) {
    console.error('Error retrieving document by ID:', error)
    throw new Error('Failed to retrieve document')
  }
}

// // Example usage
// const documentId = 123; // Replace with the actual document ID
// const markdownDocument = await getDocumentById(documentId);

// if (markdownDocument) {
//   console.log(markdownDocument.getTitle(key)); // Assuming getTitle is implemented
//   markdownDocument.convertToHTML('Your Markdown Content');
// }
