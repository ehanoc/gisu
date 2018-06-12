import React, {Component} from 'react'

import Background from './Background'
import Dialog     from './Dialog'
import Title      from './Title'

import classes from './index.scss'


/**
 * Implementation of the story slide with background, text, title and options
 */
const Slide = ({ storyNode, styles, onOptionSelected }) => (
  <div className={classes.Slide} {...styles}>

    <Background image={storyNode.background} />

    {
      storyNode.title
        ? <Title>
            { storyNode.title }
          </Title>
        : null
    }

    <Dialog choices={storyNode.choices} onOptionSelected={onOptionSelected}>
      { storyNode.text }
    </Dialog>

  </div>
)


export default Slide
