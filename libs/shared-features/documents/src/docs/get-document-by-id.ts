import { PrismaClient } from '@prisma/client'
import fs, { NoParamCallback } from 'fs'
import markdown from 'markdown-it'
import { resolve } from 'path'
import { MarkdownDocument } from '../PDFDocuments'

class MarkdownDocumentImpl implements MarkdownDocument {
  id: number
  title: string
  author: string
  content: string
  htmlContent: string
  filePath: string
  getTitle(title: string): Promise<string> {
    const yourTitle = this.getTitle(title)
    return yourTitle
  }

  constructor(id: number, title: string, author: string, content: string, htmlContent: string, filePath: string) {
    this.id = id
    this.title = title
    this.author = author
    this.content = content
    this.htmlContent = htmlContent
    this.filePath = filePath
  }

  printInfo(): Promise<string> {
    // Implementation for printing document information
    console.log(`Creating ${this.constructor.name} document information: ${this.title}`)
    return new Promise<string>((resolve, rejects => {
      resolve(`Created ${this.constructor.name} document information: ${this.title}`)
    }))
  }

  addText(text: string): Promise<string> {
    // Implementation for adding text to the document

    return
  }

  async save(content: string, options?: NoParamCallback, filePath?: string): Promise<void> {
    console.log(`Saving document to: ${filePath}`)

    fs.writeFile(filePath, content, options)
    return
  }

  print(): void {
    console.log(`Content: ${this.content} generated for ${markdown}`)
  }

  convertToHTML(markdown: string): void {
    // Implementation for converting Markdown to HTML
    console.log(`Converting Markdown to HTML: ${markdown}`)
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
      return {
        ...new MarkdownDocumentImpl(
          document.id.toString(),
          document.author,
          document.title,
          document.content,
          'defaut-doc-value',
          'defaut-file-path',
        ),
        convertToMarkdown(html: string): Promise<string>{
          new Promise<string>((resolve, reject) => {
            return
          })
          return html
        },

        saveToFile(): Promise<void> {
          return
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }
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
