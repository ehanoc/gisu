import React, {Component} from 'react'

import Typed from 'react-typed'

import classes from './index.scss'

const DialogOption = ({ children }) => (
  <li className={classes.DialogOption}>
    <Typed strings={([children])} showCursor={false}>
      <span />
    </Typed>
  </li>
)


const DialogOptions = ({ children }) => (
  <ul className={classes.DialogOptions}>
    { children }
  </ul>
)


const DialogText = ({ children }) => (
  <Typed strings={([children])} showCursor={false}>
    <div className={classes.DialogText} />
  </Typed>
)


const Dialog = ({ children }) => (
  <div className={classes.Dialog}>
    <DialogText>
      { children }
    </DialogText>

    <DialogOptions>
      <DialogOption>Do something good</DialogOption>
      <DialogOption>Do something bad</DialogOption>
      <DialogOption>Do nothing</DialogOption>
    </DialogOptions>
  </div>
)

export default Dialog
