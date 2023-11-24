// // Assuming PDFDocument, MarkdownDocument, SQLDocument are imported
// import { MarkdownDocument, PDFDocument, SQLDocument } from 'libs/shared-features/documents/src/PDFDocuments'

// let documentData = { content: 'content', id: 'user-id', title: 'title' }
// const { content, id, title } = documentData




// // Example usage of PDFDocument
// const pdfDoc: PDFDocument = {
//   filePath: '/path/to/pdf',
//   addText: (text: string) => console.log(`Adding text: ${text}`),
//   save: async () => console.log('Saving PDF'),
// }
// pdfDoc.addText('Hello, PDF!')
// await pdfDoc.save()

// // Example usage of MarkdownDocument
// const mdDoc: MarkdownDocument = {
//   ...documentData,
//   htmlContent: '<h1>Hello, Markdown!</h1>',
//   convertToHTML: (markdown: string) => console.log(`Converting Markdown to HTML: ${markdown}`),
// }
// mdDoc.convertToHTML('# Hello, Markdown!')

// // Example usage of SQLDocument
// const sqlDoc: SQLDocument = {
//   query: 'SELECT * FROM table',
//   execute: async () => console.log('Executing SQL query'),
// }
// await sqlDoc.execute()
