import { createColorPicker, createTextElement } from "../docs/tools/document-editing-tools";

// Assume this is a simplified user preference object
export interface LandingPagePreferences {
    title: string;
    description: string;
    backgroundColor: string;
    textColor: string;
  }
  
  function createDynamicLandingPage(preferences: LandingPagePreferences): Document {
    // Create a new HTML document
    const landingPage = document.implementation.createHTMLDocument(preferences.title);
  
    // Access the head and body elements
    const head = landingPage.head;
    const body = landingPage.body;



      // Input element for background color
    const colorPicker = createColorPicker(preferences.backgroundColor, (color) => {
      body.style.backgroundColor = color
    });
    body.appendChild(colorPicker);
    
    /// Use the createTextElement function for title
  const titleElement = createTextElement('h1', preferences.title, preferences.textColor);
  body.appendChild(titleElement);

  // Use the createTextElement function for description
  const descriptionElement = createTextElement('p', preferences.description, preferences.textColor);
  body.appendChild(descriptionElement);

  return landingPage;
  }
  
  // Example usage
  const userPreferences: LandingPagePreferences = {
    title: 'My Dynamic Landing Page',
    description: 'Welcome to our awesome app!',
    backgroundColor: '#f0f0f0',
    textColor: '#333',
  };
  
  const dynamicLandingPage = createDynamicLandingPage(userPreferences);
  
  // Append the generated landing page to the main document
  document.body.appendChild(dynamicLandingPage.documentElement);
  