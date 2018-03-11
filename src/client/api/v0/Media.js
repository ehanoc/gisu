import BaseAPI from './base-api'


const storedMedia = []

// Mockuped Media API
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
      } else {
        reject(new Error('No file provided'))
      }
    })
  }

  get(id) {
    console.log('Get media with ID', id, storedMedia[id])
    return storedMedia[id] ? storedMedia[id].url : ''
  }

}

export default new MediaAPI()
