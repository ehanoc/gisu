import { has, clone, extend } from 'lodash'
import storyTemplate from './story-template.json'
import {
  writeFileSync as writeFile,
  readdirSync as readDir,
  readFileSync as readFile
} from 'fs'

const writeJson = (path, object) =>
  writeFile(path, JSON.stringify(object, null, 2))

const loadJson = (path) =>
  JSON.parse(readFile(path))

const DATA_PATH = `${__dirname}/stories/`

const storyPath = (id) => `${DATA_PATH}/${id}.json`

// API to get stories from disk
// Stories are stored on /src/server/data/stories/

const loadStories = () =>
  readDir(DATA_PATH)
    .filter((path) => path.endsWith('.json'))
    .map((path) => {
      console.log(`Loading story file ${path}...`)
      return loadJson(`${DATA_PATH}/${path}`)
    })

const stories = loadStories().reduce((all, story) => {
    return extend({ [story.id] : story }, all)
  }, {} )


const loadStory = (id) =>
  loadJson(storyPath(id))


export const saveStory = (id, data) => {
  writeJson(storyPath(id), data)
  stories[id] = data
}

const createStory = (id) => {
  const story = clone(storyTemplate)
  story.id = id
  story.nodes[0].story_id = id
  return story
}


export const getStory = (id) => {
  if (!has(stories, id)) {
    const story = createStory(id)
    saveStory(id, story)
  }
  return stories[id]
}
