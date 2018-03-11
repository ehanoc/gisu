import {map, keys, reduce, toLower, clone, extend} from 'lodash'

/**
 * Utility classes and functions for API
 */


export const DEBUG = true

export const payload = (object) =>
  map(keys(object), (k) => `${k}=${object[k]}`).join('&');

/**
 * Query class
 *
 * Operations over URL query.
 * Dumps query string into an object and provides operations to handle them.
 */
export class Query {

  constructor(dict=null) {
    this.queryDict = dict != null ? dict : this._buildQueryDictFromLocation()
  }

  _buildQueryDictFromLocation() {
    // Build dictionary out of URL query parameters
    const search = decodeURI(location.search.substring(1))
    return reduce(search.split('&'), (dict, keyValueString) => {
      const kv = keyValueString.split('=')
      dict[kv[0]] = kv[1]
      return dict
    }, {})
  }

  get(field) {
    return this.queryDict[field]
  }

  toString() {
    return Object
      .keys(this.queryDict)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(this.queryDict[key])}`)
      .join('&')
    ;
  }

  toDict() {
    return clone(this.queryDict)
  }

  merge(query) {
    return new Query(extend(this.toDict(), query.toDict()))
  }

}

// Convert any text into a text ID (or handle).
export const handlify = (text) =>
  toLower(text).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')

// Initial query, obtained at page load
export const query = new Query()
