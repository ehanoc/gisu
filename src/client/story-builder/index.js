console.log(`v${BUILD_VERSION} - Built on ${BUILD_DATE}`);

import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { HashRouter as Router } from 'react-router-dom'

import StoryBuilder from './StoryBuilder'

const App = () => (
  <MuiThemeProvider>
    <StoryBuilder/>
  </MuiThemeProvider>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
