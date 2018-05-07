import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { isInteger, identity } from 'lodash'
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

    this.state = {
      image : null
    }
  }

  uploadFile() {
    this.fileInput.click();
  }

  fileSelected(file) {
    if (file) {
      Media.upload(file)
        .then((data) => {
          this.setImage(data)
          return data.id
        })
        .then(this.props.onImageSelected)
    }
  }

  componentDidMount() {
    this.updateImage()
  }

  componentWillReceiveProps(props) {
    this.updateImage(props)
  }

  setImage(data) {
    const url = data ? data.url : null
    this.setState((state) => ({
      ...state,
      image: url
    }))
  }

  updateImage(props=this.props) {
    const { imageId } = props

    if (imageId) {
      Media.get(imageId)
        .then((data) => this.setImage(data))
    } else {
      this.setImage(null)
    }
  }

  removeImage() {
    const { onImageRemoved=identity } = this.props
    this.setImage(null)
    onImageRemoved()
  }

  render() {

    const { imageId } = this.props

    const { image } = this.state

    console.log(image)

    return (
      <div className={classes.NodeInspectorImage} >
        <div className={classes.NodeInspectorImageContent} >
          {
            image ? <img src={image} />
                  : <span>No image</span>
          }

        </div>

        <div className={classes.NodeInspectorImageSelectButton}>
          <div className={classes.NodeInspectorImageSelectButtonInner} onClick={this.uploadFile.bind(this)}>
            <form ref={(ref) => this.fileForm = ref}>
              <input ref={(ref) => this.fileInput = ref}
                     type="file"
                     style={ {display: 'none'} }
                     name="file"
                     accept=".png, .jpg, .jpeg"
                     onChange={() => this.fileSelected(this.fileForm)}
              />
            </form>
            <SelectButtonIcon classes={{root: classes.NodeInspectorImageSelectButtonIcon}}/>
          </div>
        </div>

      </div>
    )
  }
}
