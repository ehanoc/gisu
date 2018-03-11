import {has} from 'lodash'

// API to get stories from disk
// Stories are stored on /src/server/data/stories/

const stories = {
  0: require('./stories/0.json')
}

export const getStory = (id) =>
  has(stories, id) ? stories[id] : null
