// Assuming these functions are part of some object, let's call it DocumentHelper
import fs from 'fs'
import PDFKit from 'pdfkit'
import { Attachment } from '../attachments'
import { AccessLog } from './access-log'
import { BaseDocument, Document } from './docs/base-document'
import { CollaborationOptions, StickyNote } from './docs/collaboration-and-interaction/colab-document-interfaces'
import { addDatabaseDiagrams } from './docs/collaboration-and-interaction/colab-document-options'
import { CustomPDFDocument } from './docs/custom-pdf-document'
import { DocumentHelper } from './docs/document-helper'
import { MarkdownDocument } from './docs/markdown-doc'
export interface DocumentOptions extends MyOptions {
  id: number
  title: string
  content: string
  htmlContent: string
  filePath: string
}

export type CustomUserCreatedMarkdownDocument = Document & MarkdownDocument
export interface CommonDocumentProperties extends CustomPDFDocument {
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
  createdBy: string // User ID or username who created the document
  language: string // Language of the document content
  accessLogs: AccessLog[] // Log of document access (e.g., who viewed the document and when)
  commentsEnabled: boolean // Flag indicating whether comments are enabled for the document
  downloadCount: number // Number of times the document has been downloaded
  revisionNotes: string[] // Array of notes for each document revision
  relatedDocuments: string[] // IDs of documents related to the current document
  customMetadata: Record<string, any> // Custom metadata associated with the document
  attachments: Attachment[] // List of file attachments associated with the document
  info: PDFKit.DocumentInfo
  save(): this
  write: (...text: string[]) => void
  //Common propertis and methods for a document ypes
}


export async function execute(query: string): Promise<void> {
  console.log(`Executing query: ${query}`)
}

const DocumentHelper: DocumentHelper = {
  captureEvents: function (): void {
    console.log('Capture events')
  },

  useCaseDiagrams: [],
  // addOutlines(collaborationOptions: CollaborationOptions): BaseDocument | CustomUserCreatedPDFDocument
  addOutlines(
    pdfDoc: any,
    collaborationOptions: CollaborationOptions
  ):
    CustomUserCreatedMarkdownDocument
    | CustomUserCreatedPDFDocument
    | BaseDocument {
    // For example, you can customize the outlines and return a CustomUserCreatedPDFDocument or BaseDocument
    this.outlines.push(`Outlines added based on collaboration options: ${JSON.stringify(collaborationOptions)}`)
    const userCreatedDoc = new CustomUserCreatedPDFDocument()
    return userCreatedDoc
  },

  createDocument(
    id: string,
    content: string,
    htmlContent: string,
    filePath: string,
    type: string,
    options: DocumentOptions
  ): Document  {
    switch (type) {
      case 'pdf':
        return DocumentHelper.createPDFDocument(options) as CustomUserCreatedPDFDocument
      case 'markdown':
        return DocumentHelper.createMarkdownDocument(options) as CustomUserCreatedMarkdownDocument
      default:
        throw new Error(`Unsupported document type: ${type}`)
    }
  },

  caretRangeFromPoint: function (x: number, y: number): Range | null {
    console.log(`Caret range from point (${x}, ${y})`)
    return null
  },

  clear: function (): void {
    console.log('Clear content')
  },

  createAttribute(localName: string): Attr {
    return document.createAttribute(localName)
  },

  createAttributeNS(namespace: string, arg1: string | null, qualifiedName: string, arg3: string): Attr {
    return document.createAttributeNS(namespace, qualifiedName)
  },

  createCDATASection(data: string): CDATASection {
    return document.createCDATASection(data)
  },

  createComment(data: string): Comment {
    return document.createComment(data)
  },

  createDocumentFragment(): DocumentFragment {
    return document.createDocumentFragment()
  },

  createPDFDocument(options: DocumentOptions): PDFDocument {
    return new PDFDocument(options)
  },

  createSQLDocument(query: string): SQLDocument {
    const doc: SQLDocument = {
      query: query,
      execute: async function (query: string): Promise<void> {
        return execute(query)
      },
    }
    return doc
  },

  createMarkdownDocument: function (options: DocumentOptions): MarkdownDocument {
    return new MarkdownDocument(options)
  },

  addStickyNotes(collaborationOptions: CollaborationOptions, stickyNotes?: StickyNote[]): Document & DocumentHelper {
    if (stickyNotes) {
      this.stickyNotes = stickyNotes
    }
    return this
  },

  addHeader(collaborationOptions: CollaborationOptions, header?: string): DocumentHelper {
    if (header) {
      this.header = header
    }
    return this
  },

  addFooter(collaborationOptions: CollaborationOptions, footer?: string): DocumentHelper {
    if (footer) {
      this.footer = footer
    }
    return this
  },

  addBookmarks(bookmarks: any[]): DocumentHelper {
    if (bookmarks) {
      this.bookmarks = bookmarks
    }
    return this
  },

  addComments(comments: string[]): DocumentHelper {
    if (comments) {
      this.comments = comments
    }
    return this
  },

  addMetadata(metadata: any): DocumentHelper {
    if (metadata) {
      this.metadata = metadata
    }
    return this
  },

  addCustomProperties(customProperties: any): DocumentHelper {
    if (customProperties) {
      this.customProperties = customProperties
    }
    return this
  },

  addParagraphs(paragraphs: string[]): DocumentHelper {
    if (paragraphs) {
      this.paragraphs = paragraphs
    }
    return this
  },

  addDatabaseDiagrams(databaseDiagrams: string[]): DocumentHelper {
    if (databaseDiagrams) {
      this.databaseDiagrams = databaseDiagrams
    }
    return this
  },

  addFlowCharts(flowCharts: string[]): DocumentHelper {
    if (flowCharts) {
      this.flowCharts = flowCharts
    }
    return this
  },
  addPlanningCharts(planningCharts: string[]): DocumentHelper {
    if (planningCharts) {
      this.planningCharts = planningCharts
    }
    return this
  },

  addClassDiagrams(classDiagrams: string[]): DocumentHelper {
    if (classDiagrams) {
      this.classDiagrams = classDiagrams
    }
    return this
  },

  addUseCaseDiagrams(useCaseDiagrams: string[]): DocumentHelper {
    if (useCaseDiagrams) {
      this.useCaseDiagrams = useCaseDiagrams
    }
    return this
  },

  addStateDiagrams(stateDiagrams: string[]): DocumentHelper {
    if (stateDiagrams) {
      this.stateDiagrams = stateDiagrams
    }
    return this
  },

  addActivityDiagrams(activityDiagrams: string[]): DocumentHelper {
    if (activityDiagrams) {
      this.activityDiagrams = activityDiagrams
    }
    return this
  },
  addMindMaps(mindMaps: string[]): DocumentHelper {
    if (mindMaps) {
      this.mindMaps = mindMaps
    }
    return this
  },
  addSequenceDiagrams(sequenceDiagrams: string[]): DocumentHelper {
    if (!this.sequenceDiagrams) {
      this.sequenceDiagrams = []
    }
    this.sequenceDiagrams.push(...sequenceDiagrams)
    console.log(`Added Sequence Diagrams: ${sequenceDiagrams.join(', ')}`)
    return this
  },

  renderUserCaseDiagram(): void {
    if (this.useCaseDiagrams && this.useCaseDiagrams.length > 0) {
      console.log('Rendering Use Case Diagrams:')
      this.useCaseDiagrams.forEach((diagram, index) => {
        console.log(`Use Case Diagram ${index + 1}: ${diagram}`)
        // Implement actual rendering logic for use case diagrams here

      })
    } else {
      console.log('No Use Case Diagrams to render.')
    }
  },

  build(): string {
    const allDiagrams = [
      ...(this.sequenceDiagrams || []),
      // Include other diagram types as needed
    ]
    return allDiagrams.join('\n')
  },

  renderClassDiagrams(): void {
    if (this.classDiagrams && this.classDiagrams.length > 0) {
      console.log('Rendering Class Diagrams:')
      this.classDiagrams.forEach((diagram, index) => {
        console.log(`Class Diagram ${index + 1}: ${diagram}`)
        // Implement actual rendering logic for class diagrams here
      })
    } else {
      console.log('No Class Diagrams to render.')
    }
  },

  renderStateDiagrams(): void {
    if (this.stateDiagrams && this.stateDiagrams.length > 0) {
      console.log('Rendering State Diagrams:')
      this.stateDiagrams.forEach((diagram, index) => {
        console.log(`State Diagram ${index + 1}: ${diagram}`)
        // Implement actual rendering logic for state diagrams here
      })
    } else {
      console.log('No State Diagrams to render.')
    }
  },

  renderMindMaps(): void {
    if (this.mindMaps && this.mindMaps.length > 0) {
      console.log('Rendering Mind Maps:')
      this.mindMaps.forEach((diagram, index) => {
        console.log(`Mind Map ${index + 1}: ${diagram}`)
        // Implement actual rendering logic for mind maps here
      })
    } else {
      console.log('No Mind Maps to render.')
    }
  },

  renderDatabaseDiagrams(collaborationOptions?: CollaborationOptions): string {
    if (this.databaseDiagrams && this.databaseDiagrams.length > 0) {
      console.log('Rendering Database Diagrams:')
      this.databaseDiagrams.forEach((diagram, index) => {
        console.log(`Database Diagram ${index + 1}: ${diagram}`)
         addDatabaseDiagrams(diagram, collaborationOptions)
      })
    } else {
      console.log('No Database Diagrams to render.')
    }
    return this.databaseDiagrams.map((diagram: any)  => {
      return addDatabaseDiagrams(diagram, collaborationOptions)
    }).join('\n')
  },


  
  databaseDiagrams: [],
  useclassDiagrams: [],
  sequenceDiagrams: [],
  classDiagrams: [],
  stateDiagrams: [],
  mindMaps: [],
}


export interface SQLDocument {
  // SQL document properties and methods...
  query: string // Example property for SQL query
  execute(query: string): Promise<void> // Example method to execute the SQL query
}

// Example implementation of DocumentCommonProperties for PDFDocument
PDFKit.prototype.getTitle = function () {
  return 'PDF Document Title'
}

PDFKit.prototype.getAuthor = function () {
  return 'PDF Document Author'
}

PDFKit.prototype.printInfo = function () {
  console.log('Printing PDF document information...')
}

// Example implementation of DocumentCommonProperties for MarkdownDocument
PDFKit.prototype.getTitle = function () {
  return this.title // Assuming title is a property of MarkdownDocument
}

PDFKit.prototype.printInfo = function () {
  console.log(`Printing Markdown document information: ${this.printInfo}`)
}

PDFKit.prototype.getAuthor = function () {
  return console.log(`PDF was created by ${this.getAuthor}`)
}

export type CustomUserCreatedPDFDocument = Document & PDFDocument

class PDFDocument extends BaseDocument {
  version: number;
  comments: string[];
  tags: string[];
  filePath: string;
  attachments: Attachment[];


  
  constructor(options: DocumentOptions) {
    super(options)
    //todo make dynamic- connect to versioning system
    this.version = 1.0 // Example version
    
    this.comments = []
    this.tags = []
    this.attachments = []
    // Additional PDF-specific initialization if needed
  }

  addText(text: string): Promise<string> {
    // Example method to add text to the PDF
    this.content += text
    // Implementation to add text
    return Promise.resolve(this.content)
  }


  // PDF-specific properties and methods
  // Example:
  async save(filePath: string, documentContent: string): Promise<void> {
    try {
      await this.saveToFile(filePath, documentContent)
      this.filePath = filePath // Update the documentId after saving
      console.log(`Document saved successfully at ${filePath}`)
    } catch (error) {
      console.error(`Error saving document: ${error.message}`)
      throw error
    }
    return this.saveToFile(filePath, documentContent)
  }

  saveToFile(filePath: string, content: string): Promise<void> {
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

  async addAttachment(attachment: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        this.attachments.push(attachment)
        console.log(`${attachment} added to ${document.title}.`)
        resolve()
      }, 1000)
    })
  }
}

export { PDFDocument }
