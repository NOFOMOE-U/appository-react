// export PYTHONPATH=.
// Assuming you have a text input element with id "textInput"
const textInput = document.getElementById("textInput") as HTMLInputElement;

document.addEventListener("keydown", (event) => {
  // Check if the key pressed is the desired shortcut (e.g., Ctrl + Shift + U)
  if (event.ctrlKey && event.shiftKey && event.key === "U") {
    toggleCase();
  }
});

function toggleCase() {
  // Get the current text from the input
  let currentText = textInput.value;

  // Toggle between lower and upper case
  currentText = currentText === currentText.toLowerCase() ?
    currentText.toUpperCase() : currentText.toLowerCase();

  // Set the modified text back to the input
  textInput.value = currentText;
}
