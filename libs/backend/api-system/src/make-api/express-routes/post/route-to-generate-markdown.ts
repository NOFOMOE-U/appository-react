import { YourRequestObject } from '@appository/backend/api-system';
import { MyContext } from '@appository/backend/context-system';
import { app } from '@appository/backend/data-access';
import { generateMarkdown } from '@appository/shared-features/documents';
import path from 'path';

// Similarly, for generating a Markdown file
app.post('/generate-markdown', async (req: YourRequestObject<MyContext>, res: Response) => {
    // Extract user information from the request
    const userId = req.user?.id;
  
    // Set user-specific file path for the generated Markdown file
    const markdownFilePath = path.join(__dirname, `/user/${userId}/generated-markdown/document.md`);
  
    // Process the Markdown generation
    generateMarkdown(req.body as string, markdownFilePath);
  
    // Send a response or handle further actions...
  });