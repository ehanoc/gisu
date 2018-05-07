import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { isInteger, last, identity } from 'lodash'
import {Media} from '../../../api'
import SelectButtonIcon from 'material-ui-icons/Add'
import {
  Button, Typography
} from 'material-ui'
import classes from './NodeInspector.scss'


/**
 * Node Inspector Audio
 *
 * Upload/remove a node's audio content
 */

export default class NodeInspectorAudio extends Component {

  constructor(props) {
    super(props)
    this.fileInput = null
    this.fileForm = null

    this.state = {
      audioSource: null
    }
  }

  uploadAudio() {
    this.fileInput.click();
  }

  audioSelected(file) {
    if (file) {
      Media.upload(file)
        .then((data) => {
          this.setAudioSource(data)
          this.props.onAudioSelected(data.id)
        })
    }
  }

  extractExtension(url) {
    let extension = ''
    if (url) {
      var match = url.match(/data:audio\/(\w+);/)
      if (match) {
        extension = match[1]
      } else {
        extension = last(url.split('.'))
      }
    }
    return extension
  }

  componentDidMount() {
    this.updateAudioSource()
  }

  setAudioSource(data) {
    const url = data ? data.url : null
    this.setState((state) => ({
      ...state,
      audioSource: url
    }))
  }

  updateAudioSource() {
    const { mediaId } = this.props
    if (isInteger(mediaId)) {
      Media.get(mediaId)
        .then((data) => this.setAudioSource(data))
    }
  }

  removeAudio() {
    const { onAudioRemoved=identity } = this.props
    this.setAudioSource(null)
    onAudioRemoved()
  }

  render() {

    const { mediaId, label } = this.props

    const { audioSource } = this.state
    const audioExtension = audioSource != null ? this.extractExtension(audioSource) : null

    console.log(mediaId, audioSource)

    return (
      <div className={classes.NodeInspectorAudio} >
        <div className={classes.NodeInspectorAudioTitle} >
          <Typography variant="subheading">{ label }</Typography>
        </div>

        <div className={classes.NodeInspectorAudioContent} >
          {
            audioSource ?
              <audio controls>
                <source src={audioSource} type={'audio/' + audioExtension} />
                Your browser does not support the audio element.
              </audio>
            : null
          }
        </div>

        <div className={classes.NodeInspectorAudioActions}>
          <form ref={(ref) => this.fileForm = ref}>
            <input ref={(ref) => this.fileInput = ref}
                   type="file"
                   style={ {display: 'none'} }
                   name="file"
                   accept=".mp3, .ogg, .webm, .wav"
                   onChange={() => this.audioSelected(this.fileForm)}
            />
          </form>
          <Button onClick={ audioSource ? this.removeAudio.bind(this) : this.uploadAudio.bind(this)}>
            { audioSource ? 'Remove' : 'Upload' }
          </Button>
        </div>

      </div>
    )
  }
}
