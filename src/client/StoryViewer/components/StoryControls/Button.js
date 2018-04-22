import React, {Component} from 'react'
import classnames from 'classnames'

import classes from './index.scss'


const Button = ({ children, icon }) => (
  <div className={classes.Button}>
    <span className={classnames("material-icons", classes.ButtonIcon)}>
      {icon}
    </span>
  </div>
)

export default Button
