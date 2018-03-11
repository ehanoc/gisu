import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {capitalize} from 'lodash'

import { Card } from 'material-ui'

import EmptyNodeInspector from './EmptyNodeInspector'
import SelectedNodeInspector from './SelectedNodeInspector'

import classes from './NodeInspector.scss'


/**
 * Node Inspector
 *
 * Set of fields and operations to handle node data
 */


export default class extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    const { selectedNode, onUpdateNode } = this.props

    return (
      <div className={classes.NodeInspector}>
      {
        selectedNode != null
          ? <SelectedNodeInspector selectedNode={selectedNode} onUpdateNode={onUpdateNode} />
          : <EmptyNodeInspector />
      }
      </div>
    )
  }
}
