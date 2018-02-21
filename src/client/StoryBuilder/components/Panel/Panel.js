import React, {Component} from 'react'

import classes from './Panel.scss'

import {
  NodeInspector,
  NodeNavigation
} from '../'

import {
  Paper
} from 'material-ui'

export default ({selectedNode, onPreviousNode, onNextNode}) => {
  const navigationBackProps = {
    disabled : selectedNode.parent == null,
    direction : -1
  }

  const navigationForwardProps = {
    disabled : selectedNode.children == null || selectedNode.children.length == 0,
    direction : 1
  }

  return (
    <Paper classes={{root:classes.Panel}}>

      <NodeNavigation {...navigationBackProps} onClick={onPreviousNode}/>
      <NodeInspector selectedNode={selectedNode} />
      <NodeNavigation {...navigationForwardProps} onClick={onNextNode}/>

    </Paper>
  )
}
