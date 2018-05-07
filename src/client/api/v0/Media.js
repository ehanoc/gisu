import BaseAPI from './base-api'


/**
 * Media API
 *
 * Manage media resources
 * Right now it is a mockup API.
 */

const storedMedia = []

class MediaAPI extends BaseAPI {

  upload(fileForm) {
    return new Promise((resolve, reject) => {
      if (fileForm) {
        const data = new FormData(fileForm)
        const file = data.get('file')

        this._post(`/media/`, { body: data })
          .then((data) => data.media)
          .then(resolve)
      } else {
        reject(new Error('No file provided'))
      }
    })
  }

  get(id) {
    return this._get(`/media/${id}/`).then((data) => data.media)
  }

}

export default new MediaAPI()
