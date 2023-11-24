import DocumentHelper from "../../PDFDocuments"

  
document.addEventListener('DOMContentLoaded', function () {
  const DocumentHelper = {
    useCaseDiagrams: [],

    addUseCaseDiagrams: function (useCaseDiagrams: string[]): typeof DocumentHelper {
      if (useCaseDiagrams) {
        this.useCaseDiagrams = useCaseDiagrams
        this.renderUseCaseDiagrams()
      }
      return this
    },

    renderUseCaseDiagrams: function () {
      const container = document.getElementById('use-case-diagrams-container') as HTMLDivElement
      container.innerHTML = '' // Clear existing diagrams

      this.useCaseDiagrams.forEach(function (diagram) {
        const diagramItem = document.createElement('div')
        diagramItem.classList.add('use-case-diagram-item')
        diagramItem.textContent = diagram
        container.appendChild(diagramItem)
      })
    },
  }

  // Function to add a use case diagram dynamically
  function addUseCaseDiagram() {
    const useCaseInput = document.getElementById('useCaseInput') as HTMLInputElement
    const diagramName = useCaseInput.value.trim()

    if (diagramName !== '') {
      DocumentHelper.useCaseDiagrams.push(diagramName)
      DocumentHelper.renderUseCaseDiagrams()
      useCaseInput.value = '' // Clear the input field
    }
  }
})



function updateUseCaseDiagrams() {
    // Placeholder logic for updating use case diagrams
    const useCaseDiagramsContainer = document.getElementById("use-case-diagrams-container") as HTMLDivElement;
  
    // Clear existing diagrams
    useCaseDiagramsContainer.innerHTML = "";
  
    // Simulate fetching updated use case diagrams (replace with your actual data)
    const updatedDiagrams = ["Updated Diagram 1", "Updated Diagram 2", "Updated Diagram 3"];
  
    updatedDiagrams.forEach(diagram => {
      const diagramItem = document.createElement("div");
      diagramItem.classList.add("use-case-diagram-item");
      diagramItem.textContent = diagram;
      useCaseDiagramsContainer.appendChild(diagramItem);
    });
  
    console.log("Updating use case diagrams...");
  }
  

  function confirmAndDelete(diagramName: string) {
    // Display a confirmation dialog
    const isConfirmed = confirm(`Are you sure you want to delete the diagram "${diagramName}"?`);

    // If confirmed, proceed with deletion
    if (isConfirmed) {
      deleteDiagram(diagramName);
    }
  }
  
  function deleteDiagram(diagramName: string) {
    // Placeholder logic for deleting a diagram
    const index = DocumentHelper.useCaseDiagrams.indexOf(diagramName);
    if (index !== -1) {
      DocumentHelper.useCaseDiagrams.splice(index, 1);
      DocumentHelper.renderUseCaseDiagrams();
      console.log(`Diagram "${diagramName}" deleted.`);
    }
  }




  
//todo front end

//   <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <link rel="stylesheet" href="styles.css">
//   <title>Productivity App</title>
// </head>
// <body>
//   <div class="container">
//     <div class="use-case-diagrams-container" id="use-case-diagrams-container">
//       <!-- Use case diagrams will be dynamically added here -->
//     </div>
//   </div>
//   <script src="script.js"></script>
// </body>
// </html>
// ///todo css
// body {
//     margin: 0;
//     font-family: 'Arial', sans-serif;
//   }
  
//   .container {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100vh;
//   }
  
//   .use-case-diagram-item {
//     background-color: #27ae60;
//     color: #fff;
//     padding: 15px;
//     border-radius: 8px;
//     margin-bottom: 10px;
//   }
  
//   .use-case-diagram-item:hover {
//     background-color: #219d54;
//   }
  


// Example usage
// DocumentHelper.addUseCaseDiagrams([
// "Project Management",
// "Task Assignment",
// "Text Chat",
// "Audio Chat",
// ]);
