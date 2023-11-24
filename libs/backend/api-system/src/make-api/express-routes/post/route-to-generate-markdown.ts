import path from 'path';
import { MyContext } from "../../../context/my-context";
import { generateMarkdown } from '../../../docs/doc-generator/generate-markdown';
import { app } from '../../../server';
import { YourRequestObject } from "../../requests/custom-request-with-context";

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