

/**
 * Transform a object into a style string
 */
export const styleToString = (style) =>
  Object.keys(style)
    .map((k) => {
      let key = k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      return `${key}:${style[k]}`;
    }).join(";")
