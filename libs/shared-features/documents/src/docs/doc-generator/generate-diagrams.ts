import DocumentHelper from "../../PDFDocuments";

document.addEventListener("DOMContentLoaded", function () {
   
  
    generateDiagrams()
    
    const DocumentHelper = {
      sequenceDiagrams: [] as string[],
  
      addSequenceDiagrams: function (sequenceDiagrams: string[]) {
        if (sequenceDiagrams) {
          this.sequenceDiagrams = sequenceDiagrams;
          this.renderSequenceDiagrams();
        }
        return this;
      },
  
      renderSequenceDiagrams: function () {
        const container = document.getElementById("sequence-diagrams-container") as HTMLDivElement;
        container.innerHTML = ""; // Clear existing diagrams
  
        this.sequenceDiagrams.forEach(function (diagram) {
          const diagramItem = document.createElement("div");
          diagramItem.classList.add("diagram-item");
          diagramItem.textContent = diagram;
          container.appendChild(diagramItem);
        });
      }, 
    };
    
    // You can also provide a button or another UI element for the user to update diagram names later
  });
  


  export function generateDiagrams() {
    const diagramCountInput = document.getElementById("diagramCount") as HTMLInputElement;
    const diagramCount = parseInt(diagramCountInput.value, 10);

    const sequenceDiagrams: string[] = [];

    // Generate sequence diagram names dynamically
    for (let i = 1; i <= diagramCount; i++) {
      sequenceDiagrams.push(`Diagram ${i}`);
    }

    // Example usage of DocumentHelper
    DocumentHelper.addSequenceDiagrams(sequenceDiagrams);
  }




// //TODO FRONT END
// <!-- Add an input field for the user to specify the number of diagrams -->
// <input type="number" id="diagramCount" placeholder="Enter the number of diagrams">

// <button onclick="generateDiagrams()">Generate Diagrams</button>

// <div class="container">
//   <div class="diagram-container" id="sequence-diagrams-container">
//     <!-- Sequence diagrams will be dynamically added here -->
//   </div>
// </div>



//TODO CSS
// body {
//   margin: 0;
//   font-family: 'Arial', sans-serif;
// }

// .container {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// }

// .use-case-diagram-item {
//   background-color: #27ae60;
//   color: #fff;
//   padding: 15px;
//   border-radius: 8px;
//   margin-bottom: 10px;
// }

// .use-case-diagram-item:hover {
//   background-color: #219d54;
// }
