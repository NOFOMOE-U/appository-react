//todo finish setinng up  by connecting to html
// Track when the user starts the page
const startTime = new Date();

// Track user interactions, e.g., when they click a button or reach a specific section
document.getElementById('buttonId').addEventListener('click', () => {
  const interactionTime = new Date() - startTime;
  sendDataToServer({ interaction: 'buttonClick', time: interactionTime });
});

// Track when the user stops interacting with the page
window.addEventListener('beforeunload', () => {
  const endTime = new Date();
  const timeSpentOnPage = endTime - startTime;
  sendDataToServer({ interaction: 'pageUnload', time: timeSpentOnPage });
});

function sendDataToServer(data) {
  // Send the data to your server using an HTTP request (e.g., fetch or XMLHttpRequest)
  fetch('/user-behavior', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
