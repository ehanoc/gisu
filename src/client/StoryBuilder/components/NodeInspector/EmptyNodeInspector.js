import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import {
  Card,
  CardContent
} from 'material-ui'

import classes from './NodeInspector.scss'


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
