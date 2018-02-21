import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import {
  Card,
  CardHeader,
  CardActions,
  FlatButton,
  TextField,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui'

import classes from './NodeInspector.scss'


export default class EmptyNodeInspector extends Component {
  render() {
    return (
      <Card>

        <CardText style={{paddingBottom: '10px'}}>
          Select a Node or Transition to edit
        </CardText>

      </Card>
    )
  }
}
