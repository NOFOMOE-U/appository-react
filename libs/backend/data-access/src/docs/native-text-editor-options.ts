export interface TextEditorOptions {
    font: string;
    fontSize: string;
    textAlign: string;
    fontWeight: string;
    fontStyle: string;
    textDecoration: string;
  }
  
export function createTextEditor(
  content: string,
  options: TextEditorOptions
): Document {
    const textEditor = document.implementation.createHTMLDocument('Text Editor');
    const head = textEditor.head;
    const body = textEditor.body;
  
    // Styles for the text editor
    const style = textEditor.createElement('style');
    style.textContent = `
      body {
        font-family: ${options.font};
        font-size: ${options.fontSize};
        text-align: ${options.textAlign};
        font-weight: ${options.fontWeight};
        font-style: ${options.fontStyle};
        text-decoration: ${options.textDecoration};
      }
    `;
    head.appendChild(style);
  
    // Content editable area
    const contentEditable = textEditor.createElement('div');
    contentEditable.contentEditable = 'true';
    contentEditable.innerHTML = content;
    body.appendChild(contentEditable);
  
    return textEditor;
  }
  
  // Example usage
  const editorOptions: TextEditorOptions = {
    font: 'Arial, sans-serif',
    fontSize: '16px',
    textAlign: 'left',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
  };
  
  const initialContent = 'Hello, this is an example text.';
  
  const textEditor = createTextEditor(initialContent, editorOptions);
  document.body.appendChild(textEditor.documentElement);
  