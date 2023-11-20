import { LandingPagePreferences } from "../../viewports/dynamic-landing-page";

export interface CollaborationOptions {
  outlines?: number;
  paragraphs?: number;
  flowCharts?: number;
  planningCharts?: number;
  databaseDiagrams?: number;
  stickyNotes?: StickyNote[];
  font?: string;
  header?: string;
  draggableSections?: DraggableSection[];
  landingPagePreferences?: LandingPagePreferences
  documentType: string
}

export interface StickyNote {
  content: string;
  color?: string;
  font?: string;
  position?: { x: number; y: number };
}



export interface DraggableSection {
  content: string;
  font?: string;
  color?: string;
  position?: { x: number; y: number };
}
