import PDFKit from 'pdfkit';
import { CollaborationOptions, StickyNote } from "./collaboration-and-interaction/colab-document-interfaces";


export interface CustomPDFDocument extends PDFKit.PDFDocument {
  // [x: string]: any;
  scrollTo(x: string): any;
  cursor(x: number, y: number, arg2: number): unknown;

  // text(text: string): any
  filePath: string
  addOutlines(outlines: any[]): void
  addParagraphs(paragraphs: string[]): void
  addFlowCharts(flowCharts: string[]): void
  addPlanningCharts(planningCharts: string[]): void
  addDatabaseDiagrams(databaseDiagrams: string[]): void
  addHeader(collaborationOptions: CollaborationOptions, header?: string): void
  addFooter(collaborationOptions: CollaborationOptions, footer?: string): void
  addStickyNotes(collaborationOptions: CollaborationOptions, notes?: StickyNote[]): void
}
  