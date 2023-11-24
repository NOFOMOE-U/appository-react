const resizer1 = document.getElementById('resizer1');
const pane1 = document.getElementById('pane1');
const pane2 = document.getElementById('pane2');
let isResizing = false;

resizer1.addEventListener('mousedown', (event) => {
  isResizing = true;
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', () => {
    isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
  });
});

function handleMouseMove(event) {
  if (isResizing) {
    const newWidth = event.clientX;
    pane1.style.width = `${newWidth}px`;
    pane2.style.width = `calc(100% - ${newWidth}px)`;
  }
}
