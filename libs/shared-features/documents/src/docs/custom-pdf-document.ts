import { PDFKit } from 'pdfkit';
import { CollaborationOptions, StickyNote } from "./collaboration-and-interaction/colab-document-interfaces";


export interface CustomPDFDocument extends PDFKit.PDFDocument {
    filePath: string
    info: string
    addOutlines(outlines: any[]): void;
    addParagraphs(paragraphs: string[]): void;
    addFlowCharts(flowCharts: string[]): void;
    addPlanningCharts(planningCharts: string[]): void;
    addDatabaseDiagrams(databaseDiagrams: string[]): void;
    addHeader(collaborationOptions: CollaborationOptions,header?: string): void
    addFooter(collaborationOptions: CollaborationOptions, footer?: string): void;
    addStickyNotes(collaborationOptions: CollaborationOptions, notes?: StickyNote[]): void;
  }
  