import React, {Component} from 'react'

import classes from './index.scss'


/**
 * Slide title
 */
const Title = ({ children }) => (
  <div className={classes.Title}>
    { children }
  </div>
)


export default Title
