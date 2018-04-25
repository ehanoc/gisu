import React, {Component} from 'react'

import classes from './index.scss'

import Button from './Button'

const StoryControls = ({ volumeEnabled, onVolumeToggle, onNextSlide }) => (
  <div className={classes.Controls}>
    <Button icon={volumeEnabled ? "volume_up" : "volume_off"} onClick={onVolumeToggle}></Button>
    <Button icon="play_arrow" onClick={onNextSlide}></Button>
  </div>
)

export default StoryControls
