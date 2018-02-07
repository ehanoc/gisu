export const moveToFront = function(selection) {
  return selection.each(function() {
    this.parentNode.appendChild(this)
  })
}

export const moveToBack = function(selection) {
  return selection.each(function() {
      const firstChild = this.parentNode.firstChild
      if (firstChild) {
          this.parentNode.insertBefore(this, firstChild)
      }
  })
}
