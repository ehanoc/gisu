
/**
 * Custom extensions to D3.js
 */


// Move a SVG element to the front (so it is rendered above the others)
export const moveToFront = function(selection) {
  return selection.each(function() {
    this.parentNode.appendChild(this)
  })
}

// Move a SVG element to the back (so it is rendered below the others)
export const moveToBack = function(selection) {
  return selection.each(function() {
      const firstChild = this.parentNode.firstChild
      if (firstChild) {
          this.parentNode.insertBefore(this, firstChild)
      }
  })
}
