import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import {isInteger, last} from 'lodash'

import {Media} from '../../../api'

import SelectButtonIcon from 'material-ui-icons/Add'

import {
  Button, Typography
} from 'material-ui'

import classes from './NodeInspector.scss'


export default class NodeInspectorAudio extends Component {

  constructor(props) {
    super(props)
    this.fileInput = null
  }

  uploadAudio() {
    this.fileInput.click();
  }

  audioSelected(file) {
    if (file) {
      Media.upload(file)
        .then((data) =>
          this.props.onAudioSelected(data.id)
        )
    }
  }

  extractExtension(url) {
    let extension = ''
    if (url) {
      var match = url.match(/data:audio\/(\w+);/)
      if (match) {
        extension = match[1]
      } else {
        extension = last(audioSource.split('.'))
      }
    }
    return extension
  }

  render() {

    const { mediaId, label } = this.props

    const audioSource = isInteger(mediaId) ? Media.get(mediaId) : null
    const audioExtension = this.extractExtension(audioSource)

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
          <input ref={(ref) => this.fileInput = ref}
                 type="file"
                 style={ {display: 'none'} }
                 accept=".mp3, .ogg, .webm, .wav"
                 onChange={() => this.audioSelected(this.fileInput.files[0])}
          />
          <Button onClick={ audioSource ? this.props.onAudioRemoved : this.uploadAudio.bind(this)}>
            { audioSource ? 'Remove' : 'Upload' }
          </Button>
        </div>

      </div>
    )
  }
}
