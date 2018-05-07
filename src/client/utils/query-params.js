import {map, keys, reduce, toLower, clone, extend, isUndefined} from 'lodash'


/**
 * Query class
 *
 * Operations over URL query.
 * Dumps query string into an object and provides operations to handle them.
 */
export class QueryParams {

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

  get(field, defaultValue=null) {
    return !isUndefined(this.queryDict[field])
      ? this.queryDict[field]
      : defaultValue
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
    return new QueryParams(extend(this.toDict(), query.toDict()))
  }

}


// Initial query, obtained at page load
export const query = new QueryParams()

export default QueryParams
