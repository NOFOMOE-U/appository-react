function makeElementDraggable(element: HTMLElement) {
    let offsetX = 0
    let offsetY = 0
    let isDragging = false
  
    element.addEventListener('mousedown', (e) => {
      isDragging = true
      offsetX = e.clientX - element.getBoundingClientRect().left
      offsetY = e.clientY - element.getBoundingClientRect().top
    })
  
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const x = e.clientX - offsetX
        const y = e.clientY - offsetY
  
        element.style.position = 'absolute'
        element.style.left = `${x}px`
        element.style.top = `${y}px`
      }
    })
  
    document.addEventListener('mouseup', () => {
      isDragging = false
    })
  }
  
  export { makeElementDraggable }
  