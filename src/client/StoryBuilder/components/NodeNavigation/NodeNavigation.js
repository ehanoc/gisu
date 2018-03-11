import React, {Component} from 'react'
import PreviousNodeIcon from 'material-ui-icons/KeyboardArrowUp'
import NextNodeIcon from 'material-ui-icons/KeyboardArrowDown'
import {
  Card,
  CardContent,
  Button
} from 'material-ui'
import classes from './NodeNavigation.scss'

/**
 * Navigation control
 */

export default ({disabled, direction=1, onClick=(()=>{})}) => (

  <div className={classes.NodeNavigation}>
    <Card>
      <CardContent>
        <Button color="primary" variant="raised" disabled={disabled} onClick={onClick}>
          {
            direction == 1
              ? <NextNodeIcon/>
              : <PreviousNodeIcon />
          }
        </Button>
      </CardContent>
    </Card>
  </div>
)
