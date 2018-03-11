import { clone } from 'lodash'

/**
 * Geometry Utilities
 */



const min = Math.min
const max = Math.max


/**
 * RectGeometry class
 *
 * Operation over rectangles
 */
class RectGeometry {

  // Calculates the union between two rectangles
  union(rect1, rect2) {
    var newRect = {
      x: min(rect2.x, rect1.x),
      y: min(rect2.y, rect1.y)
    }

    var right = max(rect1.x + rect1.width, rect2.x + rect2.width)
    var bottom = max(rect1.y + rect1.height, rect2.y + rect2.height)


    newRect.width = right - newRect.x
    newRect.height = bottom - newRect.y

    return newRect
  }

  // Scales a rectangle
  scale(rect, scale, center=true) {
    var newWidth  = rect.width * scale
    var newHeight = rect.height * scale
    var deltaHeight = rect.height - newHeight
    var deltaWidth  = rect.width - newWidth

    return {
      x: center ? rect.x + deltaWidth/2 : rect.x,
      y: center ? rect.y + deltaHeight/2 : rect.y,
      width: newWidth,
      height: newHeight
    }
  }
}

export default {
  Rect : new RectGeometry
}
