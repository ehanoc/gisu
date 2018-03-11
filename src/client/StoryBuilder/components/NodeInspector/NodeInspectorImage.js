import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import {isInteger} from 'lodash'
import {Media} from '../../../api'
import SelectButtonIcon from 'material-ui-icons/Add'
import {} from 'material-ui'
import classes from './NodeInspector.scss'


/**
 * Node Inspector Image
 *
 * Upload/remove a node's image content
 */

export default class NodeInspectorImage extends Component {

  constructor(props) {
    super(props)
    this.fileInput = null
  }

  uploadFile() {
    this.fileInput.click();
  }

  fileSelected(file) {
    if (file) {
      Media.upload(file)
        .then((data) => data.id)
        .then(this.props.onImageSelected)
    }
  }

  render() {

    const { imageId } = this.props

    const image = isInteger(imageId) ? Media.get(imageId) : 'http://via.placeholder.com/480x320?text=No%20Image'

    return (
      <div className={classes.NodeInspectorImage} >
        <div className={classes.NodeInspectorImageContent} >
          <img src={image} />
        </div>

        <div className={classes.NodeInspectorImageSelectButton}>
          <div className={classes.NodeInspectorImageSelectButtonInner} onClick={this.uploadFile.bind(this)}>

            <input ref={(ref) => this.fileInput = ref}
                   type="file"
                   style={ {display: 'none'} }
                   accept=".png, .jpg, .jpeg"
                   onChange={() => this.fileSelected(this.fileInput.files[0])}
            />

            <SelectButtonIcon classes={{root: classes.NodeInspectorImageSelectButtonIcon}}/>
          </div>
        </div>

      </div>
    )
  }
}
