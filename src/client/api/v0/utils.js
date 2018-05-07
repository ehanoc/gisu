import {map, keys, reduce, toLower, clone, extend} from 'lodash'

/**
 * Utility classes and functions for API
 */


export const DEBUG = true

export const payload = (object) =>
  map(keys(object), (k) => `${k}=${object[k]}`).join('&');



// Convert any text into a text ID (or handle).
export const handlify = (text) =>
  toLower(text).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')
