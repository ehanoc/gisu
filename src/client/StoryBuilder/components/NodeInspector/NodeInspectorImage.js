import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import SelectButtonIcon from 'material-ui-icons/Add'

import {

} from 'material-ui'

import classes from './NodeInspector.scss'


export default class NodeInspectorImage extends Component {

  render() {

    const { image } = this.props;

    return (
      <div className={classes.NodeInspectorImage} >
        <div className={classes.NodeInspectorImageContent}
             style={{ backgroundImage : `url(${image})` }}>
        </div>

        <div className={classes.NodeInspectorImageSelectButton}>
          <div className={classes.NodeInspectorImageSelectButtonInner}>
            <SelectButtonIcon classes={{root: classes.NodeInspectorImageSelectButtonIcon}}/>
          </div>
        </div>
      </div>
    )
  }
}
