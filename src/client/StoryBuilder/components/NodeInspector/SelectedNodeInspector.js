import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {capitalize} from 'lodash'

import {
  Card,
  CardHeader,
  CardActions,
  FlatButton, TextField,
  CardMedia,
  CardContent,
  Button
} from 'material-ui'

import classes from './NodeInspector.scss'

export default class SelectedNodeInspector extends Component {

  render() {
    const { selectedNode } = this.props
    const data = selectedNode.data || {}

    return (
      <Card>
        <CardHeader
          title={selectedNode.title}
          subtitle={capitalize(selectedNode.type)}
        />

        <CardMedia
          className={classes.NodeInspectorMedia}
          image={
            selectedNode.isNode
            ? "http://via.placeholder.com/350x150?text=No%20Background%20image"
            : "http://via.placeholder.com/350x150?text=No%20Background%20image"
          }
        />


        <CardContent>
          {
            data.text
              ? <TextField
                  type="text"
                  style={{width: '100%'}}
                  label="Story node text "
                  placeholder="Enter node's text"
                  rows="4"
                  multiline
                  fullWidth
                  defaultValue={data.text}
                />
              : null
          }
        </CardContent>



        <CardActions>
          <Button>Update</Button>
          {
            selectedNode.isNode
              ? <Button>Vote Up</Button>
              : null
          }
        </CardActions>



      </Card>
    )
  }
}
