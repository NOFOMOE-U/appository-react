import fs from 'fs'
import errorMessages from 'libs/backend/data-access/src/middleware/permissions/error-messages'
import { getUserByName } from '../../../../backend/data-access/src/utils/backend-auth.utils'
import { Attachment } from '../../attachments'
import { CommonDocumentProperties, DocumentOptions } from '../PDFDocuments'
import { AccessLog } from '../access-log'
import { CollaborationOptions, StickyNote } from './collaboration-and-interaction/colab-document-interfaces'

export interface Document extends DocumentOptions, CommonDocumentProperties {
  getTitle(title: string): Promise<string>
  getAuthor(author: string): Promise<string>
  printInfo(info: string): Promise<string>
  addText(text: string): Promise<string>
  save(filePath: string, documentContent: string): Promise<void>
  addAttachment(attachment: any): Promise<void>
  clear(element: HTMLElement): void
}

export class BaseDocument implements Document {
  id: number
  title: string
  content: string
  htmlContent: string
  filePath: string

  constructor(options: DocumentOptions) {
    this.id = options.id
    this.title = options.title
    this.content = options.content
    this.filePath = options.filePath
    this.htmlContent = options.htmlContent
  }
  async save(filePath: string, documentContent: string): Promise<void> {
    try {
      await this.saveToFile(filePath, documentContent)
      this.filePath = filePath // Update the documentId after saving
      console.log(`Document saved successfully at ${filePath}`)
    } catch (error) {
      console.error(`Error saving document: ${error.message}`)
      throw error
    }
  }

  protected saveToFile(filePath: string, content: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const callback: fs.NoParamCallback = (error) => {
        if (error) {
          console.error(`Error writing to file: ${error.message}`)
          reject(error)
        } else {
          resolve()
        }
      }

      fs.writeFile(filePath, content, callback)
    })
  }
  createdAt: Date
  updatedAt: Date
  sharedWith: string[]
  downloadUrl: string
  version: number
  comments: string[]
  tags: string[]
  collaborators: string[]
  permissions: Record<string, boolean>
  isPublic: boolean
  parentDocument: string
  history: string[]
  duedate: Date
  owners: string[]
  favorites: boolean
  collaborativeEditing: boolean
  taskAssignees: Record<string, string[]>
  fileTye: string
  createdBy: string
  language: string
  accessLogs: AccessLog[]
  commentsEnabled: boolean
  downloadCount: number
  revisionNotes: string[]
  relatedDocuments: string[]
  customMetadata: Record<string, any>
  attachments: Attachment[]
  info: PDFKit.DocumentInfo
  addOutlines(outlines: Outline[]): void {
    // Add outlines to the document
    const info: PDFKit.DocumentInfo = {
      outlines,
    }
    this.info = info
  }


  addParagraphs(paragraphs: string[]): void {
    this.info = JSON.stringify(paragraphs)
  }

  addFlowCharts(flowCharts: string[]): void {
    this.info = JSON.stringify(flowCharts)
  }

  addPlanningCharts(planningCharts: string[]): void {
    this.info = JSON.stringify(planningCharts)
  }

  addDatabaseDiagrams(databaseDiagrams: string[]): void {
    this.info = JSON.stringify(databaseDiagrams)
  }

  addHeader(collaborationOptions: CollaborationOptions, header?: string): void {
    this.info = JSON.stringify({ collaborationOptions, header })
  }
  addFooter(collaborationOptions: CollaborationOptions, footer?: string): void {
    this.info = JSON.stringify({ collaborationOptions, footer })
  }
  
  addStickyNotes(collaborationOptions: CollaborationOptions, notes?: StickyNote[]): void {
    this.info = JSON.stringify({ collaborationOptions, notes })
  }

  clear(): void {
    this.content = ''
    this.attachments = []
  }

  async getTitle(title: string): Promise<string> {
    const currentTitle = document.title
    return currentTitle
  }

  async getAuthor(author: string): Promise<string> {
    try {
      const user = await getUserByName()['username']
      return user
    } catch (err) {
      errorMessages.authorNotFound
    }
  }

 async printInfo(): Promise<string> {
    console.log(`Printing ${this.constructor.name} document information: ${this.title}`)
    return new Promise<string>((resolve, reject) => {})
  }

  async addAttachment(attachment: any): Promise<void> {
    // logic to add attachment
    console.log(`adding ${attachment} to your document named ${this.title}`)
    return Promise.resolve()
  }

  async addText(text: string): Promise<string> {
    // logic to add text to document
    this.content + text
    return this.content
  }
}
