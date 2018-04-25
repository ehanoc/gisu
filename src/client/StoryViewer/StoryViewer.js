import React, {Component} from 'react'

import {
  StoryControls,
  SlideManager,
  Slide
} from './components'

import classes from './index.scss'

const log = console.log.bind(console, '[StoryViewer]')

const mockupNodes = [
  {
    "id": 0,
    "title": "First Node",
    "text": "The story begins with a single node",
    "background": "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg"
  },
  {
    "id": 1,
    "title": "Second Node",
    "text": "That leads to a second node",
    "background": "https://media-cdn.tripadvisor.com/media/photo-s/0f/05/55/c8/beach-area.jpg"
  },
  {
    "id": 2,
    "title": "Third Node",
    "text": "And a third. What about choosing something?",
    "background": "https://media-cdn.tripadvisor.com/media/photo-s/0f/05/55/c8/beach-area.jpg",

    "choices": [
      {
        "text": "Do something right now",
        "next_node_id": 3
      },

      {
        "text": "Do nothing",
        "next_node_id": 3
      },

      {
        "text": "Sleep",
        "next_node_id": 3
      }
    ]
  },
  {
    "id": 3,
    "title": "Last Node",
    "text": "Finally, the last node",
    "background": null
  },
]


class StoryViewer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentSlide : 0,
      volumeEnabled: true
    }
  }

  nextSlide() {
    log('Next slide')
    this.setState((state) => ({
      ...state, currentSlide: state.currentSlide + 1
    }))
  }

  toggleVolume() {
    log('Toggle volume')
    this.setState((state) => ({
      ...state, volumeEnabled: !state.volumeEnabled
    }))
  }

  onOptionSelected(choice) {
    console.log('Chosen', choice)
    this.nextSlide()
  }

  render() {
    return (
      <div className={classes.StoryViewer}>

        <SlideManager currentSlide={this.state.currentSlide}>
          {
            mockupNodes.map((node, i) => (
              <Slide
                key={i}
                storyNode={node}
                onOptionSelected={this.onOptionSelected.bind(this)}
              />
            ))
          }
        </SlideManager>

        <StoryControls
          volumeEnabled={this.state.volumeEnabled}
          onVolumeToggle={this.toggleVolume.bind(this)}
          onNextSlide={this.nextSlide.bind(this)}
        />

      </div>
    )
  }
}


export default StoryViewer
