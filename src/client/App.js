import React from 'react'
import ReactDOM from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AppContainer } from 'react-hot-loader'

import { BrowserRouter as Router } from 'react-router-dom'

import StoryBuilder from './StoryBuilder/'
import StoryViewer from './StoryViewer/'

import { query as queryParams } from './utils/query-params'

import withRoot from './withRoot'

const storyId = queryParams.get('story_id', 0)
const mode = queryParams.get('mode', 'view')


/**
 * Application
 *
 * This component will decide what view to render.
 */
const App = () => (
  mode == 'view'
    ? <StoryViewer storyId={storyId} />
    : <StoryBuilder storyId={storyId} />
)


export default withRoot(App)
