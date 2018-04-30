import BaseAPI from './base-api'


/**
 * Media API
 *
 * Manage media resources
 * Right now it is a mockup API.
 */

const storedMedia = []

class MediaAPI extends BaseAPI {

  upload(file) {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const mediaData = {
            id   : storedMedia.length,
            url  : event.target.result,
            file : file
          }
          storedMedia.push(mediaData)
          resolve(mediaData)
        }
        reader.readAsDataURL(file)

        this._post()
      } else {
        reject(new Error('No file provided'))
      }
    })
  }

  get(id) {
    return storedMedia[id] ? storedMedia[id].url : ''
  }

}

export default new MediaAPI()
