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

        <CardMedia>
          { selectedNode.isNode ? <img src="http://via.placeholder.com/350x150?text=No%20Background%20image" alt="" /> : null }
        </CardMedia>


        <CardText>
          {
            data.text
              ? <TextField
                style={{width: '100%'}}
                hintText="Enter node's text"
                value={data.text}
              />
              : null
          }
        </CardText>



        <CardActions>
          <FlatButton label="Update" />
          {
            selectedNode.isNode
              ? <FlatButton label="Vote Up" />
              : null
          }
          <FlatButton label="Cancel" />
        </CardActions>
      </Card>
    )
  }
}
