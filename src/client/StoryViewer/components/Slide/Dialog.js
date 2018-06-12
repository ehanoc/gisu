import React, {Component} from 'react'

import Typed from 'react-typed'

import classes from './index.scss'


/**
 * A dialog option.
 */
const DialogOption = ({ children, choice, onOptionSelected }) => (
  <li className={classes.DialogOption} onClick={() => onOptionSelected(choice)}>
    <Typed strings={([choice.text])} showCursor={false}>
      <span />
    </Typed>
  </li>
)


/**
 * Options for the dialog
 */
const DialogOptions = ({ children }) => (
  <ul className={classes.DialogOptions}>
    { children }
  </ul>
)


/**
 * Dialog typed text
 */
const DialogText = ({ children }) => (
  <Typed strings={([children])} showCursor={false}>
    <div className={classes.DialogText} />
  </Typed>
)


/**
 * Slide text dialog which may contain options
 */
const Dialog = ({ children, choices=[], onOptionSelected }) => (
  <div className={classes.Dialog}>
    <DialogText>
      { children }
    </DialogText>

    {
      choices.length > 0
        ? <DialogOptions>
            {
              choices.map((choice, i) => (
                <DialogOption choice={choice} onOptionSelected={onOptionSelected} key={i} />
              ))
            }
          </DialogOptions>
        : null
    }

  </div>
)


export default Dialog
