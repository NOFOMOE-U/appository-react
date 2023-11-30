import { PrismaClient } from '@prisma/client';
import { MarkdownDocument } from './markdown-doc';

const prisma = new PrismaClient();

// Example function to save or update a Markdown document
export async function saveOrUpdateDocument(document: MarkdownDocument): Promise<void> {
    try {
     const existingDocument = await prisma.markdownDocument.findUnique({
      where: { id: document.id }
    });
    if (existingDocument) {
      // Document already exists, update it
      await prisma.markdownDocument.update({
        where: { id: document.id },
        data: { title: document.title, content: document.content }
      });
    } else {
      // Document doesn't exist, insert a new one
      await prisma.markdownDocument.create({
        data: { id: document.id, title: document.title, content: document.content }
      });
    }

    console.log('Document saved or updated successfully');
  } catch (error) {
    // Handle errors, e.g., log or throw
    console.error('Error saving or updating document:', error);
    throw new Error('Failed to save or update document');
  } finally {
    // Close the Prisma client to avoid resource leaks
    await prisma.$disconnect();
  }
}