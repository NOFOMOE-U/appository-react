// Assuming these functions are part of some object, let's call it DocumentHelper
import { MarkdownDocument } from '@appository/backend/data-access'
import fs from 'fs'
import PDFKit from 'pdfkit'
import { Attachment } from '../attachments'
import { AccessLog } from './access-log'
import { BaseDocument, Document } from './docs/base-document'
import { CollaborationOptions, StickyNote } from './docs/collaboration-and-interaction/colab-document-interfaces'
import { addOutlines } from './docs/collaboration-and-interaction/colab-document-options'
import { CustomPDFDocument } from './docs/custom-pdf-document'
export interface DocumentOptions {
  id: number
  title: string
  content: string
  htmlContent: string
  filePath: string
}

type CustomUserCreatedMarkdownDocument = Document & MarkdownDocument
export interface CommonDocumentProperties extends CustomPDFDocument {
  createdAt: Date
  updatedAt: Date
  sharedWith: string[]
  downloadUrl: string
  version: string
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

  //Common propertis and methods for a document ypes
}

export interface DocumentHelper {
  captureEvents(): void
  caretRangeFromPoint(x: number, y: number): Range | null
  createAttribute(localName: string): Attr
  createAttributeNS(namespace: string, arg1: string | null, qualifiedName: string, arg3: string): Attr
  createCDATASection(data: string): CDATASection
  createComment(data: string): Comment
  createDocumentFragment(): DocumentFragment
  clear(): void

  createDocument(type: string, options: Document): Document
  createPDFDocument(options: DocumentOptions): PDFDocument
  createSQLDocument(query: string): SQLDocument
  createMarkdownDocument(options: DocumentOptions): MarkdownDocument
  addOutlines(collaborationOptions: CollaborationOptions): BaseDocument | CustomUserCreatedDocument

  addStickyNotes(collaborationOptions: CollaborationOptions, stickyNotes?: StickyNote[]): DocumentHelper
  addBookmarks(bookmarks: any[]): DocumentHelper
  addComments(comments: string[]): DocumentHelper
  addMetadata(metadata: any): DocumentHelper

  addCustomProperties(customProperties: any): DocumentHelper
  addParagraphs(paragraphs: string[]): DocumentHelper

  addFlowCharts(flowCharts: string[]): DocumentHelper

  addPlanningCharts(planningCharts: string[]): DocumentHelper
  addPlanningCharts(planningCharts: string[]): DocumentHelper

  addDatabaseDiagrams(databaseDiagrams: string[]): DocumentHelper


  addClassDiagrams(classDiagrams: string[]): DocumentHelper

  addSequenceDiagrams(sequenceDiagrams: string[]): DocumentHelper 

  addUseCaseDiagrams(useCaseDiagrams: string[]): DocumentHelper ,
  addStateDiagrams(stateDiagrams: string[]): DocumentHelper,

  addActivityDiagrams(activityDiagrams: string[]): DocumentHelper ,
  addMindMaps(mindMaps: string[]): DocumentHelper,

  addHeader(collaborationOptions: CollaborationOptions, header?: string): DocumentHelper
  addFooter(collaborationOptions: CollaborationOptions, footer?: string): DocumentHelper
}

const documentHelper: DocumentHelper = {
  createPDFDocument(options: DocumentOptions): PDFDocument {
    return new PDFDocument(options)
  },

  createMarkdownDocument(options: DocumentOptions): MarkdownDocument {
    return new MarkdownDocument(options)
  },

  addOutlines(collaborationOptions: CollaborationOptions): CustomUserCreatedDocument | BaseDocument {
    this.addOutlines = addOutlines
    console.log('Addedd outlines: ', collaborationOptions)
    return this
  },

  addStickyNotes(collaborationOptions: CollaborationOptions, stickyNotes?: StickyNote[]): DocumentHelper {
    this.stickyNotes = stickyNotes
    console.log('Added sticky notes: ', stickyNotes)
    return this
  },

  addBookmarks(bookmarks: any[]): DocumentHelper {
    this.bookmarks = bookmarks
    console.log('Added sticky notes: ', bookmarks)

    return this
  },

  addComments(comments: string[]): DocumentHelper {
    this.comments = comments
    console.log('Added comments:', comments)
    return this
  },
  addMetadata(metadata: any): DocumentHelper {
    this.customMetadata = metadata
    console.log('Added custom metadata:', metadata)
    return this
  },
  addCustomProperties(customProperties: any): DocumentHelper {
    Object.assign(this, customProperties)
    console.log('Added custom properties:', customProperties)
    return this
  },
  addParagraphs(paragraphs: string[]): DocumentHelper {
    this.paragraphs = paragraphs
    console.log('Added paragraphs:', paragraphs)
    return this
  },

  addFlowCharts(flowCharts: string[]): DocumentHelper {
    this.flowCharts = flowCharts
    console.log('Added flowCharts: ', flowCharts)
    return this
  },
  addPlanningCharts(planningCharts: string[]): DocumentHelper {
    this.planningCharts = planningCharts
    console.log('Added flowCharts: ', planningCharts)
    return this
  },
  addDatabaseDiagrams(databaseDiagrams: string[]): DocumentHelper {
    this.databaseDiagrams = databaseDiagrams
    console.log('Added flowCharts: ', databaseDiagrams)
    return this
  },

  addHeader(collaborationOptions: CollaborationOptions, header?: string): DocumentHelper {
    this.header = header
    console.log('Added header: ', header)
    return this
  },

  addFooter(collaborationOptions: CollaborationOptions, footer?: string): DocumentHelper {
    this.footer = footer
    console.log('Added footer: ', footer)

    return this
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
  captureEvents: function (): void {
    // logic to capture DOM events
    //todo update captureEvent
  },
  caretRangeFromPoint: function (x: number, y: number): Range {
    // logic to get caret range from x,y coordinates
    return null
  },
  createAttribute: function (localName: string): Attr {
    return document.createAttribute(localName)
  },
  createAttributeNS: function (namespace: string, arg1: string, qualifiedName: string, arg3: string): Attr {
    return document.createAttributeNS(namespace, qualifiedName)
  },
  createCDATASection: function (data: string): CDATASection {
    return document.createCDATASection(data)
  },
  createComment: function (data: string): Comment {
    return document.createComment(data)
  },
  createDocumentFragment: function (): DocumentFragment {
    return document.createDocumentFragment()
  },
  clear: function (): void {
    console.log('Clear content')
  },
  createDocument: function (type: string, options: Document): Document {
    switch (type) {
      case 'pdf':
        return this.createPDFDocument(options)
      case 'markdown':
        return this.createMarkdownDocument(options)
      default:
        throw new Error(`Unknown document type: ${type}`)
    }
  },
  addClassDiagrams: function (classDiagrams: string[]): DocumentHelper {
    throw new Error('Function not implemented.')
  },
  addSequenceDiagrams: function (sequenceDiagrams: string[]): DocumentHelper {
    throw new Error('Function not implemented.')
  },
  addUseCaseDiagrams: function (useCaseDiagrams: string[]): DocumentHelper {
    throw new Error('Function not implemented.')
  },
  addStateDiagrams: function (stateDiagrams: string[]): DocumentHelper {
    throw new Error('Function not implemented.')
  },
  addActivityDiagrams: function (activityDiagrams: string[]): DocumentHelper {
    throw new Error('Function not implemented.')
  },
  addMindMaps: function (mindMaps: string[]): DocumentHelper {
    throw new Error('Function not implemented.')
  }
}

async function execute(query: string): Promise<void> {
  console.log(`Executing query: ${query}`)
}

const DocumentHelper: DocumentHelper = {
  captureEvents: function (): void {
    console.log('Capture events')
  },

  // addOutlines(collaborationOptions: CollaborationOptions): BaseDocument | CustomUserCreatedDocument

  addOutlines(
    collaborationOptions: CollaborationOptions,
    options?: DocumentOptions,
  ): CustomUserCreatedDocument | BaseDocument {
    // TODO: implement addOutlines method
    throw new Error('addOutlines method not implemented')
  },





  createDocument(type: string, options: DocumentOptions): Document {
    switch (type) {
      case 'pdf':
        return DocumentHelper.createPDFDocument(options) as CustomUserCreatedDocument
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

  createAttribute: function (localName: string): Attr {
    return document.createAttribute(localName)
  },

  createAttributeNS: function (namespace: string, arg1: string | null, qualifiedName: string, arg3: string): Attr {
    return document.createAttributeNS(namespace, qualifiedName)
  },

  createCDATASection: function (data: string): CDATASection {
    return document.createCDATASection(data)
  },

  createComment: function (data: string): Comment {
    return document.createComment(data)
  },

  createDocumentFragment: function (): DocumentFragment {
    return document.createDocumentFragment()
  },

  createPDFDocument: function (options: DocumentOptions): PDFDocument {
    return new PDFDocument(options)
  },

  createSQLDocument: function (query: string): SQLDocument {
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
  addStickyNotes: function (collaborationOptions: CollaborationOptions, stickyNotes?: StickyNote[]): Document & DocumentHelper {
    if (stickyNotes) {
      this.stickyNotes = stickyNotes
    }
    return this
  },

  addHeader: function (collaborationOptions: CollaborationOptions, header?: string): DocumentHelper {
    if (header) {
      this.header = header
    }
    return this
  },

  addFooter: function (collaborationOptions: CollaborationOptions, footer?: string): DocumentHelper {
    if (footer) {
      this.footer = footer
    }
    return this
  },

  addDatabaseDiagrams: function (databaseDiagrams: string[]): DocumentHelper {
    if (databaseDiagrams) {
      this.databaseDiagrams = databaseDiagrams
    }
    return this
  },

  addBookmarks: function (bookmarks: any[]): DocumentHelper {
    if (bookmarks) {
      this.bookmarks = bookmarks
    }
    return this
  },

  addComments: function (comments: string[]): DocumentHelper {
    if (comments) {
      this.comments = comments
    }
    return this
  },

  addMetadata: function (metadata: any): DocumentHelper {
    if (metadata) {
      this.metadata = metadata
    }
    return this
  },

  addCustomProperties: function (customProperties: any): DocumentHelper {
    if (customProperties) {
      this.customProperties = customProperties
    }
    return this
  },

  addParagraphs: function (paragraphs: string[]): DocumentHelper {
    if (paragraphs) {
      this.paragraphs = paragraphs
    }
    return this
  },

  addFlowCharts: function (flowCharts: string[]): DocumentHelper {
    if (flowCharts) {
      this.flowCharts = flowCharts
    }
    return this
  },
  addPlanningCharts: function (planningCharts: string[]): DocumentHelper {
    if (planningCharts) {
      this.planningCharts = planningCharts
    }
    return this
  },

  addClassDiagrams: function (classDiagrams: string[]): DocumentHelper {
    if (classDiagrams) {
      this.classDiagrams = classDiagrams
    }
    return this
  },

  addSequenceDiagrams: function (sequenceDiagrams: string[]): DocumentHelper {
    if (sequenceDiagrams) {
      this.sequenceDiagrams = sequenceDiagrams
    }
    return this
  },

  addUseCaseDiagrams: function (useCaseDiagrams: string[]): DocumentHelper {
    if (useCaseDiagrams) {
      this.useCaseDiagrams = useCaseDiagrams
    }
    return this
  },
  addStateDiagrams: function (stateDiagrams: string[]): DocumentHelper {
    if (stateDiagrams) {
      this.stateDiagrams = stateDiagrams
    }
    return this
  },

  addActivityDiagrams: function (activityDiagrams: string[]): DocumentHelper {
    if (activityDiagrams) {
      this.activityDiagrams = activityDiagrams
    }
    return this
  },
  addMindMaps: function (mindMaps: string[]): DocumentHelper {
    if (mindMaps) {
      this.mindMaps = mindMaps
    }
    return this
  },
}

export default DocumentHelper

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













type CustomUserCreatedDocument = Document & PDFDocument

class PDFDocument extends BaseDocument {
  constructor(options: DocumentOptions) {
    super(options)
    // Additional PDF-specific initialization if needed
  }

  version: string
  comments: string[]
  tags: string[]
  // PDF document properties and methods...
  filePath: string 
  addText(text: string): Promise<string> {
    // Example method to add text to the PDF
    this.content += text
    // Implementation to add text
    return Promise.resolve(this.content)
  }


  attachments: Attachment[] // Array to hold attachments


  // PDF-specific properties and methods
  // Example:
  async save(filePath: string, documentContent: string): Promise<string> {
    try {
      await this.saveToFile(filePath, documentContent);
      this.filePath = filePath; // Update the documentId after saving
      console.log(`Document saved successfully at ${filePath}`);
      return 'Success';
    } catch (error) {
      console.error(`Error saving document: ${error.message}`);
      throw error;
    }
  }

  protected saveToFile(filePath: string, content: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const callback: fs.NoParamCallback = (error) => {
        if (error) {
          console.error(`Error writing to file: ${error.message}`);
          reject(error);
        } else {
          resolve();
        }
      };

      fs.writeFile(filePath, content, callback);
    });
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

class MarkdownDocument extends BaseDocument implements MarkdownDocument {
  constructor(options: DocumentOptions) {
    super(options)
    // Additional Markdown-specific initialization if needed
  }

  // Markdown-specific properties and methods
  convertToMarkdown(html: string, searchValue: string, replaceValue: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const convertedContent = html.replace(searchValue, replaceValue)
      resolve(convertedContent)
    })
  } 
} 

export { MarkdownDocument, PDFDocument }
