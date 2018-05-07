import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {identity as id, pick, isUndefined} from 'lodash'
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
import NodeInspectorImage from './NodeInspectorImage'
import NodeInspectorAudio from './NodeInspectorAudio'
import classes from './NodeInspector.scss'

/**
 * Selected Node Inspector
 *
 * Show all data from a node, allows to update and vote up
 */

export default class SelectedNodeInspector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modified : false,
      upvoted  : false,
      data : {}
    }

    this.updateData()
  }


  componentWillReceiveProps(props) {
    this.updateData(props)
  }

  updateData(props=this.props) {
    const node = props.selectedNode
    this.setState((state) => {
      let newState

      if (node.index != null) {
        if (this.state.node != node) {
          console.log('[NodeInspector] Set node to', node)
          newState = {
            ...state,
            node,
            modified: false,
            upvoted: false,
            data: node.getData()
          }
        } else {
          newState = state
        }
      } else {
        newState = {
          ...state,
          node: null,
          modified: false,
          upvoted: false,
          data: {}
        }
      }

      return newState
    })

  }

  getField(field) {
    return this.state.data[field] !== null ? this.state.data[field] : ''
  }

  setField(field, value) {
    this.setState((state) => ({ data: { ...state.data, [field]:value }, modified: true }) )
  }

  onFieldChange(field, event) {
    this.setField(field, event.target.value)
  }

  updateNode(handler) {
    const { selectedNode } = this.props
    if (selectedNode.isEdge) {
      selectedNode.updateData(this.state.data)
      handler(selectedNode.getSource().data)
    } else {
      handler(this.state.data)
    }
    this.setState({ modified: false })
  }

  upvote(handler) {
    this.state.data.votes += 1
    handler(pick(this.state.data, 'id', 'votes'))
    this.setState({ upvoted : true })
  }

  render() {
    const { selectedNode, onUpdateNode, limitUpvote=false } = this.props

    const { modified, upvoted, data } = this.state
    const { isEdge, isNode } = selectedNode

    return (
      <Card>
        <CardContent>
          {
            isNode
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
        {
          isNode ?
            <NodeInspectorImage
              imageId={this.getField('background_id')}
              onImageSelected={ (mediaId) => this.setField('background_id', mediaId) }
            />
          : null
        }
        <CardContent>
          <TextField
              type="text"
              style={{width: '100%'}}
              label={isEdge ? 'Option text' : "Node text"}
              placeholder="Enter node's text"
              rows="4"
              multiline
              fullWidth
              value={this.getField('text')}
              onChange={this.onFieldChange.bind(this, 'text')}
            />


          {
            isNode
              ? <NodeInspectorAudio
                  label="Music"
                  mediaId={ this.getField('music_id') }
                  onAudioSelected={ (mediaId) => this.setField('music_id', mediaId) }
                  onAudioRemoved ={ () => this.setField('music_id', null) }
                />
             : null
          }

          {
            isNode
              ? <NodeInspectorAudio
                  label="SFX"
                  mediaId={ this.getField('sfx_id') }
                  onAudioSelected={ (mediaId) => this.setField('sfx_id', mediaId) }
                  onAudioRemoved ={ () => this.setField('sfx_id', null) }
                />
              : null
          }
        </CardContent>



        <CardActions>
          <Button
            disabled={!modified}
            onClick={() => this.updateNode(onUpdateNode)}
            variant="raised"
            color="primary">

            Update
          </Button>
          {
            isNode
              ? <Button
                  disabled={limitUpvote && upvoted}
                  onClick={() => this.upvote(onUpdateNode)}
                  variant="raised"
                  color="secondary">

                  Vote Up
                </Button>
              : null
          }
        </CardActions>



      </Card>
    )
  }
}
