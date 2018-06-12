import React, {Component} from 'react'

import classes from './index.scss'


/**
 * Slide Background
 */
const Background = ({ image }) => (
  <div className={classes.Background}>
    <img className={classes.BackgroundImage} src={image} />
  </div>
)


export default Background
