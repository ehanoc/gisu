import React, {Component} from 'react'

import {
  StoryControls,
  SlideManager,
  Slide
} from './components'

import classes from './index.scss'


class StoryViewer extends Component {

  render() {
    return (
      <div className={classes.StoryViewer}>

        <SlideManager>
          <Slide />
        </SlideManager>

        <StoryControls />

      </div>
    )
  }
}


export default StoryViewer
