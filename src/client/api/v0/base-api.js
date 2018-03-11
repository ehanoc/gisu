// Fetch polyill
import 'whatwg-fetch'

import { query, Query } from './utils'
import { extend, isString, last, camelCase, snakeCase, omit } from 'lodash'

const ENDPOINT = `${window.location.protocol}//${window.location.host}/api/v0`


/**
 *
 * BASE API Wrapper
 *
 * Each method performing and API call will return a Promise.
 *
 */
export default class API {

  constructor(endpoint=ENDPOINT) {
    this.endpoint = endpoint;
  }

  _api(path, method='get', options={}) {
    let queryParams = new Query().merge(query)

    options.headers = extend(this._headers(method), options.headers)

    if (options.body != null) {
      if (method == 'get' || method == 'delete') {
        queryParams = queryParams.merge(new Query(options.body))
        options.body = null
      } else {
        if (!(options.body instanceof FormData)) {
          options.body = JSON.stringify(options.body)
          options.headers['Content-Type'] = 'application/json'
        }
      }
    }

    const url = this.endpoint + path + `?${queryParams.toString()}`
    const _opts = extend(this._options(method), options, { method })

    return fetch( url, _opts )
      .then((response) => response.json())
      .catch((e) => {
        console.error('Error on fetching', url, _opts)
        throw e
      })
  }

  _get(path, options={}) {
    return this._api(path, 'get', options)
  }

  _post(path, options={}) {
    return this._api(path, 'post', options)
  }

  _put(path, options={}) {
    return this._api(path, 'put', options)
  }

  _delete(path, options={}) {
    return this._api(path, 'delete', options)
  }

  _options(method) {
    const options = {}

    /*
    if (!this._isCSRFSafeMethod(method)) {
      options.credentials = 'same-origin'
    }
    */

    return options;
  }

  _headers(method) {
    const headers = {}

    /*
    if (!this._isCSRFSafeMethod(method)) {
      headers['X-CSRFToken'] = this._getCsrfToken()
    }
    */

    return headers
  }

  /*
  _isCSRFSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }

  _getCsrfToken() {
    return Cookies.get('csrftoken') || $("[name=csrfmiddlewaretoken]").val()
  }
  */

}
