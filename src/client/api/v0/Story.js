import BaseAPI from './base-api'

/**
 * Story API
 *
 * Manage Story resources
 *
 * Not implemented yet. Only get(id) available.
 */

class StoryAPI extends BaseAPI {

  // Get a story by ID
  get(storyId) {
    return this._get(`/stories/${storyId}/`)
  }

}

export default new StoryAPI()
