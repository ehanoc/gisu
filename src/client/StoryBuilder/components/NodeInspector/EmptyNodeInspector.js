import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import {
  Card,
  CardContent
} from 'material-ui'

import classes from './NodeInspector.scss'


/**
 * Empty Node inspector
 *
 * Rendered when there is no node selected
 */

export default class EmptyNodeInspector extends Component {
  render() {
    return (
      <Card>

        <CardContent style={{paddingBottom: '10px'}}>
          Select a Node or Transition to edit
        </CardContent>

      </Card>
    )
  }
}
