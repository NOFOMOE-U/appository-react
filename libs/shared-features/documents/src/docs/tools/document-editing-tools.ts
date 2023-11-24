// editing-tools.ts

export function createColorPicker(value: string, onChange: (color: string) => void): HTMLInputElement {
  const colorPicker = document.createElement('input');
  colorPicker.type = 'color';
  colorPicker.value = value;
  colorPicker.addEventListener('input', (event) => {
    onChange((event.target as HTMLInputElement).value);
  });
  return colorPicker;
}

export function createTextElement(tag: string, textContent: string, color: string): HTMLElement {
  const element = document.createElement(tag);
  element.textContent = textContent;
  element.style.color = color;
  return element;
}
