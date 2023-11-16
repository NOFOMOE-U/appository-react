import { MarkdownDocument } from "libs/shared-features/documents/src/PDFDocuments";

// Example function to save or update a Markdown document
async function saveOrUpdateDocument(document: MarkdownDocument): Promise<void> {
    try {
      // Assuming you have a database connection or another storage mechanism
      // Here, you might use a database ORM or a direct query to save/update the document
  
      // Example: Saving to a hypothetical database
      const existingDocument = await database.query('SELECT * FROM markdown_documents WHERE id = ?', [document.id]);
  
      if (existingDocument) {
        //todo connect to database being used such as postgres
        // Document already exists, update it
        await database.query('UPDATE markdown_documents SET title = ?, content = ? WHERE id = ?', [document.title, document.content, document.id]);
      } else {
        // Document doesn't exist, insert a new one
        await database.query('INSERT INTO markdown_documents (id, title, content) VALUES (?, ?, ?)', [document.id, document.title, document.content]);
      }
  
      console.log('Document saved or updated successfully');
    } catch (error) {
      // Handle errors, e.g., log or throw
      console.error('Error saving or updating document:', error);
      throw new Error('Failed to save or update document');
    }
  }
  