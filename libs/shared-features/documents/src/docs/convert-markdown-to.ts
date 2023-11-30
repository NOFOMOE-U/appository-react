import markdownIt from 'markdown-it';

export function convertMarkdownToHTML(markdown: string): string {
    const md = markdownIt();
    return md.render(markdown);
  }
