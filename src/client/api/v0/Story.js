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

  update(story) {
    return this._post(`/stories/${story.id}/`, { body: story })
  }

}

export default new StoryAPI()
