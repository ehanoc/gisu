import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {capitalize} from 'lodash'

import {Card, CardHeader, CardActions, FlatButton, TextField, CardMedia, CardTitle, CardText} from 'material-ui';


class EmptyNodeInspector extends Component {
  render() {
    return (
      <Card className="node-inspector">

      <CardHeader
        title="Select a node to edit"
      />

      </Card>
    )
  }
}


class SelectedNodeInspector extends Component {

  render() {
    const { selectedNode } = this.props
    const data = selectedNode.data

    return (
      <Card className="node-inspector">

        <CardHeader
          title={selectedNode.title}
          subtitle={capitalize(selectedNode.type)}
        />

        <CardMedia>
          <img src="http://via.placeholder.com/350x150" alt="" />
        </CardMedia>


        <CardText>
          <TextField
            style={{width: '100%'}}
            hintText="Enter node's text"
            value={data.text}
          />
        </CardText>



        <CardActions>
          <FlatButton label="Update" />
          <FlatButton label="Vote Up" />
          <FlatButton label="Cancel" />
        </CardActions>
      </Card>
    )
  }
}


export default class extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    const { selectedNode } = this.props


    return selectedNode != null
      ? <SelectedNodeInspector selectedNode={selectedNode}/>
      : <EmptyNodeInspector />


  }
}
