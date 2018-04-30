import React from 'react'
import ReactDOM from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AppContainer } from 'react-hot-loader'

import { BrowserRouter as Router } from 'react-router-dom'

import StoryBuilder from './StoryBuilder/'
import StoryViewer from './StoryViewer/'

import withRoot from './withRoot'


/**
 * Application
 *
 * This component will decide what view to render.
 */
const App = ({ mode = 'edit' }) => (
  mode == 'view'
    ? <StoryViewer/>
    : <StoryBuilder/>
)

export default withRoot(App)
