import React, {Component} from 'react'
import classnames from 'classnames'
import classes from './Panel.scss'
import {
  NodeInspector,
  NodeNavigation
} from '../'
import {
  Paper
} from 'material-ui'


/**
 * Panel class
 *
 * It's a pane with node inspector and navigation controls
 */

export default ({selectedNode, onPreviousNode, onNextNode, onUpdateNode, className}) => {
  const navigationBackProps = {
    disabled : selectedNode.parent == null,
    direction : -1
  }

  const navigationForwardProps = {
    disabled : selectedNode.children == null || selectedNode.children.length == 0,
    direction : 1
  }

  return (
    <Paper classes={{root: classnames(classes.Panel, className)}}>

      <NodeNavigation {...navigationBackProps} onClick={onPreviousNode}/>
      <NodeInspector selectedNode={selectedNode} onUpdateNode={onUpdateNode} />
      <NodeNavigation {...navigationForwardProps} onClick={onNextNode}/>

    </Paper>
  )
}
