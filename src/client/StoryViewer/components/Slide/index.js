import React, {Component} from 'react'

import Background from './Background'
import Dialog     from './Dialog'
import Title      from './Title'

import classes from './index.scss'

const Slide = () => (
  <div className={classes.Slide}>

    <Background />

    <Title>
      My Title
    </Title>

    <Dialog>
      Curabitur blandit lorem metus, a efficitur libero egestas eget.
      Nullam tincidunt eros at dapibus commodo. Vivamus viverra ex ut
      sapien porttitor, sed condimentum purus pellentesque.
    </Dialog>

  </div>
)

export default Slide
