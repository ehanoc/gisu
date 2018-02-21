import React from 'react'
import ReactDOM from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AppContainer } from 'react-hot-loader'

import { BrowserRouter as Router } from 'react-router-dom'

import StoryBuilder from './StoryBuilder/'
import withRoot from './withRoot'

const App = () => (
  <StoryBuilder/>
)

export default withRoot(App)
