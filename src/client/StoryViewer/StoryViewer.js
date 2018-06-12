import {Story} from '../api'
import React, {Component} from 'react'

import {
  StoryControls,
  SlideManager,
  Slide
} from './components'

import classes from './index.scss'


const log = console.log.bind(console, '[StoryViewer]')


/**
 * Story visualization component
 */
class StoryViewer extends Component {


  constructor(props) {
    super(props)
    this.state = {
      currentSlide : 0,
      volumeEnabled: true,
      story : {
        nodes : []
      }
    }

    this.updateStory()
  }

  /**
   * On props change, update story state in the client
   */
  componentWillReceiveProps(props) {
    this.updateStory(props)
  }

  /**
   * Build the URL for media based on ID
   */
  getMediaUrl(id) {
    return `/uploads/${id}`
  }

  /**
   * Update story state
   */
  updateStory(props=this.props) {
    Story.get(props.storyId)
      .then((story) => {

        story.nodes.forEach((node) => {
          node.background = this.getMediaUrl(node.background_id)
          node.music = this.getMediaUrl(node.music)
          node.sfx = this.getMediaUrl(node.sfx)
        })

        this.setState({ story })
      })
  }

  /**
   * Change to next slide
   */
  nextSlide() {
    log('Next slide')
    this.setState((state) => ({
      ...state, currentSlide: state.currentSlide + 1
    }))
  }

  /**
   * Enable or disable volume
   */
  toggleVolume() {
    log('Toggle volume')
    this.setState((state) => ({
      ...state, volumeEnabled: !state.volumeEnabled
    }))
  }

  /**
   * Handle story option selection
   */
  onOptionSelected(choice) {
    console.log('Chosen', choice)
    this.nextSlide()
  }

  /**
   * Render view
   */
  render() {
    const { nodes } = this.state.story

    console.log('Rendering nodes', nodes)

    return (
      <div className={classes.StoryViewer}>

        <SlideManager currentSlide={this.state.currentSlide}>
          {
            nodes.map((node, i) => (
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
