import markdownIt from 'markdown-it'
import { CustomUserCreatedMarkdownDocument, CustomUserCreatedPDFDocument, DocumentOptions, PDFDocument, SQLDocument, execute } from '../PDFDocuments'
import { BaseDocument } from './base-document'
import { CollaborationOptions, StickyNote } from './collaboration-and-interaction/colab-document-interfaces'
import { addOutlines } from './collaboration-and-interaction/colab-document-options'
import { MarkdownDocument } from './markdown-doc'

export interface DocumentHelper {
  captureEvents(): void
  caretRangeFromPoint(x: number, y: number): Range | null
  createAttribute(localName: string): Attr
  createAttributeNS(namespace: string, arg1: string | null, qualifiedName: string, arg3: string): Attr
  createCDATASection(data: string): CDATASection
  createComment(data: string): Comment
  createDocumentFragment(): DocumentFragment
  clear(): void
  createDocument(
    id: string,
    content: string,
    htmlContent: string,
    filePath: string,
    type: string,
    options: DocumentOptions
  ): Document

  createPDFDocument(options: DocumentOptions): PDFDocument
  createSQLDocument(query: string): SQLDocument
  createMarkdownDocument(options: DocumentOptions): MarkdownDocument
  addOutlines(pdfDoc: any, collaborationOptions: CollaborationOptions): CustomUserCreatedMarkdownDocument | CustomUserCreatedPDFDocument | BaseDocument

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

  addUseCaseDiagrams(useCaseDiagrams: string[]): DocumentHelper
  addStateDiagrams(stateDiagrams: string[]): DocumentHelper
  addActivityDiagrams(activityDiagrams: string[]): DocumentHelper
  addMindMaps(mindMaps: string[]): DocumentHelper

  addHeader(collaborationOptions: CollaborationOptions, header?: string): DocumentHelper
  addFooter(collaborationOptions: CollaborationOptions, footer?: string): DocumentHelper

  build(): string

  renderDiagrams(): void

  useCaseDiagrams: string[]
  databaseDiagrams: string[]
  useclassDiagrams: string[]
  sequenceDiagrams: string[]
  classDiagrams: string[]
  stateDiagrams: string[]
  mindMaps: string[]
}

const documentHelper: DocumentHelper = {
  createPDFDocument(options: DocumentOptions): PDFDocument {
    return new PDFDocument(options)
  },

  createMarkdownDocument(options: DocumentOptions): MarkdownDocument {
    const md = new markdownIt()
    const renderedContent = md.render(options.content)
    return new MarkdownDocument({ ...options, htmlContent: renderedContent })
  },

  addOutlines(
    pdfDoc: any,
    collaborationOptions: CollaborationOptions
  ): CustomUserCreatedMarkdownDocument | BaseDocument {
    this.addOutlines = addOutlines(pdfDoc, collaborationOptions)
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
  createDocument: function (
    id: string,
    content: string,
    htmlContent: string,
    filePath:string,
    type: string,
    options: DocumentOptions): Document {
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
    this.diagrams.push(...classDiagrams)
    return this
  },
  addSequenceDiagrams(sequenceDiagrams: string[]): DocumentHelper {
    this.diagrams.push(...sequenceDiagrams)
    return this
  },

  addUseCaseDiagrams(useCaseDiagrams: string[]): DocumentHelper {
    this.diagrams.push(...useCaseDiagrams)
    return this
  },

  addStateDiagrams(stateDiagrams: string[]): DocumentHelper {
    this.diagrams.push(...stateDiagrams)
    return this
  },

  addActivityDiagrams(activityDiagrams: string[]): DocumentHelper {
    this.diagrams.push(...activityDiagrams)
    return this
  },

  addMindMaps(mindMaps: string[]): DocumentHelper {
    this.diagrams.push(...mindMaps)
    return this
  },

  build(): string {
    // Assuming you want to concatenate all diagrams into a single string for the document
    return this.diagrams.join('\n')
  },

  databaseDiagrams: [],
  useclassDiagrams: [],
  sequenceDiagrams: [],
  useCaseDiagrams: [],
  classDiagrams: [],
  stateDiagrams: [],
  mindMaps: [],
  renderDiagrams(): void {
    // Assuming you have a list of diagram types to render
    const diagramTypes: string[] = ['userCase', 'class', 'state', 'mindMap', 'database'];
  
    diagramTypes.forEach((diagramType) => {
      switch (diagramType) {
        case 'userCase':
          this.renderUserCaseDiagram();
          break;
        case 'class':
          this.renderClassDiagrams();
          break;
        case 'state':
          this.renderStateDiagrams();
          break;
        case 'mindMap':
          this.renderMindMaps();
          break;
        case 'database':
          this.renderDatabaseDiagrams();
          break;
        default:
          console.log(`Invalid diagram type: ${diagramType}`);
          break;
        }
    });
  }
}



export default DocumentHelper

export interface RenderDiagrams {
  renderUserCaseDiagram(): void
  renderClassDiagrams(): void
  renderStateDiagrams(): void
  renderMindMaps(): void
  renderDatabaseDiagrams(): void
}

const renderDiagrams: RenderDiagrams = {
  renderUserCaseDiagram: function (): void {
    // Implementation for rendering user case diagram
    console.log('Rendering User Case Diagram...')
  },
  renderClassDiagrams: function (): void {
    // Implementation for rendering class diagrams
    console.log('Rendering Class Diagrams...')
  },
  renderStateDiagrams: function (): void {
    // Implementation for rendering state diagrams
    console.log('Rendering State Diagrams...')
  },
  renderMindMaps: function (): void {
    // Implementation for rendering mind maps
    console.log('Rendering Mind Maps...')
  },
  renderDatabaseDiagrams: function (): void {
    // Implementation for rendering database diagrams
    console.log('Rendering Database Diagrams...')
  },
}