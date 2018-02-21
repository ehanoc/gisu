import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {capitalize} from 'lodash'

import { Card } from 'material-ui'

import EmptyNodeInspector from './EmptyNodeInspector'
import SelectedNodeInspector from './SelectedNodeInspector'

import classes from './NodeInspector.scss'


export default class extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    const { selectedNode} = this.props

    return (
      <div className={classes.NodeInspector}>
      {
        selectedNode != null
          ? <SelectedNodeInspector selectedNode={selectedNode} />
          : <EmptyNodeInspector />
      }
      </div>
    )
  }
}
