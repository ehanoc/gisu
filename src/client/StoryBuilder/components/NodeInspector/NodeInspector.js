import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {capitalize} from 'lodash'

import {
  Card,
  CardHeader,
  CardActions,
  FlatButton, TextField,
  CardMedia, CardTitle,
  CardText
} from 'material-ui'

import EmptyNodeInspector from './EmptyNodeInspector'
import SelectedNodeInspector from './SelectedNodeInspector'

import classes from './NodeInspector.scss'


export default class extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    const { selectedNode, docked } = this.props

    return (
      <div className={docked ? classes.NodeInspectorDocked : classes.NodeInspector}>
      {
        selectedNode != null
          ? <SelectedNodeInspector selectedNode={selectedNode}/>
          : <EmptyNodeInspector />
      }
      </div>
    )


  }
}
