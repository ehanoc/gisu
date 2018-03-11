import React from 'react'
import ReactDOM from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AppContainer } from 'react-hot-loader'

import { BrowserRouter as Router } from 'react-router-dom'

import StoryBuilder from './StoryBuilder/'
import withRoot from './withRoot'

/**
 * Application
 *
 * This component will decide what view to render.
 */

const App = () => (
  <StoryBuilder/>
)

export default withRoot(App)
