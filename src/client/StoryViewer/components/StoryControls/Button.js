import React, {Component} from 'react'
import classnames from 'classnames'

import classes from './index.scss'


/**
 * Button for the Story Controls
 */
const Button = ({ children, icon, onClick }) => (
  <div className={classes.Button} onClick={onClick}>
    <span className={classnames("material-icons", classes.ButtonIcon)}>
      {icon}
    </span>
  </div>
)

export default Button
