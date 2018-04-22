import React, {Component} from 'react'

import classes from './index.scss'

import Button from './Button'

const StoryControls = () => (
  <div className={classes.Controls}>
    <Button icon="volume_up"></Button>
    <Button icon="play_arrow"></Button>
  </div>
)

export default StoryControls
