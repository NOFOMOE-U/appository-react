// commonTypes.ts
import { extendType, objectType } from 'nexus';


export const DocumentType = objectType({
  name: 'Document',
  definition(t) {
    t.id('id');
    t.string('title');
    t.string('content');
    t.string('htmlContent');
    // Add other common fields
  },
});






// Define the MarkdownDocument type
export const MarkdownDocumentType = extendType({
  type: 'Document',
  definition(t) {
    t.id('id');
    t.string('title');
    t.string('content');
    t.string('htmlContent'); // Add 'htmlContent' field
  },
});




export const PDFDocumentType = extendType({
  type: 'Document',
  definition(t) {
    // Add fields specific to PDFDocument
    t.string('pdfSpecificField');
  },
});





export const Query = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('documents', {
      type: 'Document',
      resolve: async (_parent, _args, ctx) => {
        return ctx.getPrisma().document.findMany();
      },
    });
    t.field('document', {
      type: 'Document',
      args: { id: 'Int' },
      resolve: async (_parent, { id }, ctx) => {
        return ctx.getPrisma().document.findUnique({
          where: { id },
        });
      },
    });
  },
});






export const Mutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createDocument', {
      type: 'Document',
      args: {
        data: 'DocumentInput',
      },
      resolve: async (_parent, { data }, ctx) => {
        return ctx.getPrisma().document.create({
          data,
        });
      },
    });
    t.field('updateDocument', {
      type: 'Document',
      args: {
        id: 'Int',
        title: 'String',
        content: 'String',
        htmlContent: 'String',
      },
      resolve: async (_parent, { id, title, content, htmlContent }, ctx) => {
        return ctx.getPrisma().documents.update({
          data: {
            title,
            content,
            htmlContent,
          },
          where: {
            id,
          },
        });
      },
    });
    t.field('deleteDocument', {
      type: 'Document',
      args: {
        id: 'Int',
      },
      resolve: async (_parent, { id }, ctx) => {
        return ctx.getPrisma().documents.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});