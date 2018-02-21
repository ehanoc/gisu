import {has} from 'lodash'

const stories = {
  0: require('./stories/0.json')
}

export const getStory = (id) =>
  has(stories, id) ? stories[id] : null
