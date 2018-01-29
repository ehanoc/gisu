console.log(`v${BUILD_VERSION} - Built on ${BUILD_DATE}`);

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'

import StoryBuilder from './StoryBuilder'


ReactDOM.render(
  <StoryBuilder/>,
  document.getElementById('root')
)
