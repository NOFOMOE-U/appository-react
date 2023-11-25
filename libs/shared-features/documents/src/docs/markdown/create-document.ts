import options, { MyOptions } from '@appository/backend/request-options'
import PDFKit from 'pdfkit'
import { CollaborationOptions, DraggableSection, StickyNote } from '../collaboration-and-interaction/colab-document-interfaces'
import {
  addDatabaseDiagrams,
  addFlowCharts,
  addOutlines,
  addParagraphs,
  addPlanningCharts,
} from '../collaboration-and-interaction/colab-document-options'
import { CustomPDFDocument } from '../custom-pdf-document'
import { handleCollaborationOptions } from '../handle-error.utils'



async function createDocumentConent(pdfDoc: CustomPDFDocument, content: string): Promise<void>{
  pdfDoc.font(collaborationOptions.font || 'Helvetica')
  pdfDoc.text(content)
}


function applyCollaborationTools(pdfDoc: CustomPDFDocument, collaboratiionOptions: CollaborationOptions) {
  handleCollaborationOptions(pdfDoc, collaboratiionOptions);

  addOutlines(pdfDoc, collaboratiionOptions);


  addOutlines(pdfDoc, collaborationOptions.outlines as unknown as CollaborationOptions);
  addParagraphs(pdfDoc, collaborationOptions.paragraphs as unknown as CollaborationOptions);
  addFlowCharts(pdfDoc, collaborationOptions.flowCharts as unknown as CollaborationOptions);
  addPlanningCharts(pdfDoc, collaborationOptions.planningCharts as unknown as CollaborationOptions);
  addDatabaseDiagrams(pdfDoc, collaborationOptions.databaseDiagrams as unknown as CollaborationOptions);
  addStickyNotes(pdfDoc, collaborationOptions.stickyNotes as unknown as CollaborationOptions);
  addHeader(pdfDoc, collaborationOptions.header as unknown as CollaborationOptions);
  addDraggableSections(pdfDoc, collaborationOptions.draggableSections as unknown as CollaborationOptions);
}

function setDefaultDocumentType(pdfDoc: CustomPDFDocument, collaboratiionOptions: CollaborationOptions){
  if (collaborationOptions?.documentType) {
    pdfDoc.info.Title = collaborationOptions.documentType
  }
}


export async function createDocument(
  content: string,
  options: MyOptions,
  collaborationOptions?: CollaborationOptions,
): Promise<CustomPDFDocument> {
  const pdfDoc: CustomPDFDocument = new PDFKit() as CustomPDFDocument

  // Add content to the PDF, hande other configurations
  pdfDoc.info.Title = options.qualifiedName // Set the document title
  pdfDoc.info.Author = 'your app name' // set the document author
  // Set default document type to a blank document
  let defaultDocumentType: string
  if (collaborationOptions?.documentType) {
    defaultDocumentType = collaborationOptions.documentType
  }
  if (collaborationOptions) {
    // Apply overall document styling
    pdfDoc.font(collaborationOptions.font || 'Helvetica')
    pdfDoc.text(content)

    // Handle collaboration options
    handleCollaborationOptions(pdfDoc, collaborationOptions)
    
    // Add collaboration tools
    addOutlines(pdfDoc, collaborationOptions.outlines as unknown as CollaborationOptions)
    addParagraphs(pdfDoc, collaborationOptions.paragraphs as unknown as CollaborationOptions)
    addFlowCharts(pdfDoc, collaborationOptions.flowCharts as unknown as CollaborationOptions)
    addPlanningCharts(pdfDoc, collaborationOptions.planningCharts as unknown as CollaborationOptions)
    addDatabaseDiagrams(pdfDoc, collaborationOptions.databaseDiagrams as unknown as CollaborationOptions)
    addStickyNotes(pdfDoc, collaborationOptions.stickyNotes as unknown as CollaborationOptions)
    addHeader(pdfDoc, collaborationOptions.header as unknown as CollaborationOptions)
    addDraggableSections(pdfDoc, collaborationOptions.draggableSections as unknown as CollaborationOptions)

    // Focus on the contenteditable div or any other element where the user should start typing
    const contentEditable = document.querySelector('.contenteditable') as HTMLElement | null // Replace with your actual selector
    if (contentEditable) {
      contentEditable.focus()
    }
  }
  return pdfDoc
}

const collaborationOptions: CollaborationOptions = {
  outlines: 2,
  paragraphs: 3,
  flowCharts: 1,
  planningCharts: 1,
  databaseDiagrams: 1,
  documentType: 'collaborative document',
  landingPagePreferences: {
    title: 'My Dynamic Landing Page',
    description: 'Welcome to our awesome app!',
    backgroundColor: '#f0f0f0',
    textColor: '#333',
  },
  stickyNotes: [
    { content: 'Important Note 1', position: { x: 100, y: 100 }, color: 'yellow', font: 'Helvetica' },
    { content: 'Another Note', position: { x: 200, y: 200 }, color: 'pink', font: 'Courier' },
  ],
  header: 'Document Header',
  font: 'Arial',
  draggableSections: [
    { content: 'Section 1: Introduction' },
    { content: 'Section 2: Features' },
    { content: 'Section 3: Conclusion' },
  ],
}

const collaborationHelper = new CollaborationHelper(collaborationOptions);

// Assuming you have an HTML element you want to modify
const yourElement = document.getElementById(elementId);

// Apply font to the element
collaborationHelper.applyFont(yourElement);

// Apply draggable sections to the element
collaborationHelper.applyDraggableSections(yourElement);

createDocument('Document Content' as unknown as string, options, collaborationOptions)

// Function to add sticky notes to the PDF
export function addStickyNotes(
  pdfDoc: CustomPDFDocument,
  collaborationOptions: CollaborationOptions,
  notes?: StickyNote[],
): void {
  // Implement logic to add sticky notes
  if (notes) {
    for (const note of notes) {
      if (note.position && note.font) {
        // Check if note.position is defined
        const x = note.position.x || 0
        const y = note.position.y || 0

        pdfDoc.text(`Sticky Note: ${note.content}`, note.position?.x || 0, note.position?.y || 0).font(note.font)
        pdfDoc.rect(note.position.x, note.position.y, 100, 50).fill(note.color) // Example rectangle for a sticky note
        pdfDoc.text(note.content, note.position.x + 10, note.position.y + 10).font(note.font)
      }
    }
  }
}

// Function to add a header to the PDF
export function addHeader(
  pdfDoc: CustomPDFDocument,
  collaborationOptions: CollaborationOptions,
  header?: string,
): void {
  if (header) {
    pdfDoc.fontSize(18).text(header, { align: 'center' })
    pdfDoc.moveDown(0.5)
  }
}

// Function to add draggable sections to the PDF
export function addDraggableSections(
  pdfDoc: CustomPDFDocument,
  collaborationOptions: CollaborationOptions,
  sections?: DraggableSection[],
): void {
  if (sections) {
    for (const section of sections) {
      pdfDoc.moveDown(1)
      pdfDoc.fontSize(14).text(section.content, { align: 'left' })
      pdfDoc.moveDown(0.5)
    }
  }
}



//   todo
// In this extended function:

// The MyOptions type is used to pass the necessary options, including qualifiedName.
// The pdfDoc.info object is used to set metadata properties like Title and Author.
// You can further customize the PDF document by adding more configurations based on your requirements.
// Regarding your second question about providing users a way to extend your app, it sounds like you're looking for a modular and extensible architecture. You can achieve this by designing your application with a modular structure and providing extension points where users can plug in their custom functionality. This could involve:

// Plugin System: Create a plugin system that allows users to develop and integrate their own features or modules into your application.

// APIs and Hooks: Expose APIs or hooks that users can leverage to customize or extend specific functionalities in your app.

// Documentation: Provide comprehensive documentation and guides for users who want to extend or customize your application.

// Template or Starter Code: Offer a starter code or template that users can use as a foundation for building their own apps, ensuring they follow your app's architecture.

// todo FRONTEND:
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <link rel="stylesheet" href="styles.css">
//   <title>Resizable Panes</title>
// </head>
// <body>
//   <div class="container">
//     <div class="pane" id="pane1">
//       <!-- Content for pane 1 -->
//       Pane 1
//     </div>
//     <div class="resizer" id="resizer1"></div>
//     <div class="pane" id="pane2">
//       <!-- Content for pane 2 -->
//       Pane 2
//     </div>
//   </div>
//   <script src="script.js"></script>
// </body>
// </html>

//TODO CSS
// body, html {
//     height: 100%;
//     margin: 0;
//     overflow: hidden;
//   }

//   .container {
//     display: flex;
//     height: 100%;
//   }

//   .pane {
//     flex-grow: 1;
//     overflow: auto;
//     border: 1px solid #ddd;
//     resize: both;
//     background-color: #f8f8f8;
//     padding: 10px;
//   }

//   .resizer {
//     cursor: ew-resize;
//     background-color: #ddd;
//     width: 8px;
//     height: 100%;
//     flex-shrink: 0;
//   }
