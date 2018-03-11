import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {identity as id, pick} from 'lodash'

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

  constructor(props) {
    super(props)
    this.state = {
      modified : false,
      upvoted  : false,
      data : {}
    }
  }

  _setNode(node) {
    if (node.data != null && node.data.id != this.state.data.id) {
      console.log('[NodeInspector] Set node to', node.data)
      this.state.modified = false
      this.state.upvoted = false
      this.state.data = node.data || {}
    }
  }

  getField(field) {
    return this.state.data[field] ? this.state.data[field] : ''
  }

  setField(field, value) {
    this.setState({ data: { ...this.state.data, [field]:value }, modified: true })
  }

  onFieldChange(field, event) {
    this.setField(field, event.target.value)
  }

  updateNode(handler) {
    handler(this.state.data)
    this.setState({ modified: false })
  }

  upvote(handler) {
    this.state.data.votes += 1
    handler(pick(this.state.data, 'id', 'votes'))
    this.setState({ upvoted : true })
  }

  render() {
    const { selectedNode, onUpdateNode, limitUpvote=false } = this.props
    this._setNode(selectedNode)


    const { modified, upvoted } = this.state
    const data = selectedNode.data || {}

    return (
      <Card>
        <CardContent>
          {
            data.text
              ? <TextField
                  type="text"
                  style={{width: '100%'}}
                  label="Node Title"
                  placeholder="Enter node's title"
                  inputProps = { {style : { fontSize: 24 }} }
                  fullWidth
                  value={this.getField('title')}
                  onChange={this.onFieldChange.bind(this, 'title')}
                />
              : null
          }
        </CardContent>


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
                  label="Node text "
                  placeholder="Enter node's text"
                  rows="4"
                  multiline
                  fullWidth
                  value={this.getField('text')}
                  onChange={this.onFieldChange.bind(this, 'text')}
                />
              : null
          }
        </CardContent>



        <CardActions>
          <Button disabled={!modified} onClick={() => this.updateNode(onUpdateNode)}>Update</Button>
          {
            selectedNode.isNode
              ? <Button disabled={limitUpvote && upvoted} onClick={() => this.upvote(onUpdateNode)}>Vote Up</Button>
              : null
          }
        </CardActions>



      </Card>
    )
  }
}
