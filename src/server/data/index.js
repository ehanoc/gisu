const _ = require('lodash')

const stories = {
  0: require('./stories/0.json')
}

const getStory = (id) =>
  _.has(stories, id) ? stories[id] : null

module.exports = {
  getStory
}
