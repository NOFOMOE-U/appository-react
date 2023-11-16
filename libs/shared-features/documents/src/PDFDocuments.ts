// Assuming these functions are part of some object, let's call it DocumentHelper
import PDFKit from 'pdfkit';

interface DocumentCommon {
    //Common propertis and methods for a document ypes
    getTitle(): string; //example method to get the title
    printInfo(): void // exampe
  }

interface DocumentHelper {
    captureEvents(): void;
    caretRangeFromPoint(x: number, y: number): Range | null;
    createAttribute(localName: string): Attr;
    createAttributeNS(namespace: string, arg1: string | null, qualifiedName: string, arg3: string): Attr;
    createCDATASection(data: string): CDATASection;
    createComment(data: string): Comment;
    createDocumentFragment(): DocumentFragment;
    clear(): void;
  }  

//clear elements from the document  
export function clear(element: HTMLElement): void {
    // Assuming you want to clear the content of an HTML element
    element.innerHTML = '';
    }

    // Example usage:
    const myDivElement = document.getElementById('myDiv');
    if (myDivElement) {
    clear(myDivElement);  
    }


  const DocumentHelper: DocumentHelper = {
    captureEvents: function (): void {
      console.log('Capture events')
    },  
  
    caretRangeFromPoint: function (x: number, y: number): Range | null {
      console.log(`Caret range from point (${x}, ${y})`)
      return null;
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
  };    
  
  export default DocumentHelper;
  

  

export interface PDFDocument {
    // PDF document properties and methods...
    filePath: string; // Example property for file path
    addText(text: string): void; // Example method to add text to the PDF
    save(): Promise<void>; // Example method to save the PDF
  }
  
  export interface MarkdownDocument {
    // Markdown document properties and methods...
    id: string
    title: string
    content: string
    htmlContent: string;
    // Example method to convert Markdown to HTML
    convertToHTML(markdown: string): void;
    }
  
  export interface SQLDocument {
    // SQL document properties and methods...
    query: string; // Example property for SQL query
    execute(): Promise<void>; // Example method to execute the SQL query
  }
  



// Example implementation of DocumentCommonProperties for PDFDocument
PDFKit.prototype.getTitle = function () {
  return 'PDF Document Title'
}

PDFKit.prototype.printInfo = function () {
  console.log('Printing PDF document information...');
};

// Example implementation of DocumentCommonProperties for MarkdownDocument
PDFKit.prototype.getTitle = function () {
  return this.title; // Assuming title is a property of MarkdownDocument
};

PDFKit.prototype.printInfo = function () {
  console.log(`Printing Markdown document information: ${this.title}`);
};