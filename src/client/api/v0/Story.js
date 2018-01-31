import BaseAPI from './base-api'

class StoryAPI extends BaseAPI {

  get(storyId) {
    return this._get(`/stories/${storyId}/`)
  }

}

export default new StoryAPI()
