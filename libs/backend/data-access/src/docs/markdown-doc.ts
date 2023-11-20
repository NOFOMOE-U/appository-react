import { MarkdownDocument } from "libs/shared-features/documents/src/PDFDocuments";

export function createMarkdownDocument(content: string): MarkdownDocument {
  // Implementation for creating a Markdown document

  //convert markdown content to html
  const htmlContent = convertMarkdownToHTML(content)

  //for siimplicity, return the HTMl content as MarkdownDocument
  return { htmlContent } as MarkdownDocument
}

function convertMarkdownToHTML(markdown: string): string {
  // Implementation to convert markdown to HTML
  return markdown
}
  