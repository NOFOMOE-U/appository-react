import { LandingPagePreferences } from '../../../../../backend/data-access/src/viewports/dynamic-landing-page';
import { makeElementDraggable } from '../tools/drag-element';

export interface CollaborationOptions {
  outlines?: number
  paragraphs?: number
  flowCharts?: number
  planningCharts?: number
  databaseDiagrams?: number
  stickyNotes?: StickyNote[]
  font?: string
  header?: string
  draggableSections?: DraggableSection[]
  landingPagePreferences?: LandingPagePreferences
  documentType: string
}

export interface StickyNote {
  content: string
  color?: string
  font?: string
  position?: { x: number; y: number }
}
class CollaborationHelper {
  constructor(private collaborationOptions: CollaborationOptions) {}

  applyFont(element: HTMLElement) {
    if (this.collaborationOptions.font) {
      element.style.fontFamily = this.collaborationOptions.font
    }
  }

  applyDraggableSections(element: HTMLElement) {
    if (this.collaborationOptions.draggableSections) {
      this.collaborationOptions.draggableSections.forEach((section) => {
        // Create draggable section element
        const sectionElement = document.createElement('div')

        // Apply styles
        this.applyFont(sectionElement)
        if (section.color) {
          sectionElement.style.color = section.color
        }

        // Add content
        sectionElement.innerText = section.content

        // Make draggable
        makeElementDraggable(sectionElement)

        // Add to document
        element.appendChild(sectionElement)
      })
    }
  }
}

export interface DraggableSection {
  content: string
  font?: string
  color?: string
  position?: { x: number; y: number }
}