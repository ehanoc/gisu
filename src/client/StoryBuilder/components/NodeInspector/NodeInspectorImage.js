import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import SelectButtonIcon from 'material-ui-icons/Add'

import {

} from 'material-ui'

import classes from './NodeInspector.scss'


export default class NodeInspectorImage extends Component {

  constructor(props) {
    super(props)
    this.fileInput = null
    this.state = {
      imageFileSrc : ''
    }
  }

  uploadFile() {
    this.fileInput.click();
  }

  fileUploaded(file) {
    if (file) { 
      const reader = new FileReader()
      reader.onload = (event) => {
        this.setState({ imageFileSrc : event.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  render() {

    const { image } = this.props
    const { imageFileSrc } = this.state



    return (
      <div className={classes.NodeInspectorImage} >
        <div className={classes.NodeInspectorImageContent} >
          <img src={imageFileSrc ? imageFileSrc : image } />
        </div>

        <div className={classes.NodeInspectorImageSelectButton}>
          <div className={classes.NodeInspectorImageSelectButtonInner} onClick={this.uploadFile.bind(this)}>

            <input ref={(ref) => this.fileInput = ref}
                   type="file"
                   style={ {display: 'none'} }
                   accept=".png, .jpg, .jpeg"
                   onChange={() => this.fileUploaded(this.fileInput.files[0])}
            />

            <SelectButtonIcon classes={{root: classes.NodeInspectorImageSelectButtonIcon}}/>
          </div>
        </div>

      </div>
    )
  }
}
