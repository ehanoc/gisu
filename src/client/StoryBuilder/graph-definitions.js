import React from 'react'

import classes from './StoryBuilder.scss'

/**
 * Definitions for Graph elements.
 */

const CircularControlClass = {
  add : classes.AddNodeControl,
  voteup : classes.VoteupNodeControl
}


const CircularControl = (action, icon, color) => (
  <symbol viewBox="0 0 100 100" id={CircularControlClass[action]}>
    <circle cx="20" cy="20" r="20" className={`${color} hover`}></circle>
    <text textAnchor="middle" x="20" y="30" fontSize="30px" className={`white material-icons`} dy="0.05em">{icon}</text>
  </symbol>
)

// Control placed on nodes to add new nodes
const AddNodeControl = CircularControl('add', 'share', 'pink')

// Control placed on nodes to vote up the node
const VoteUpNodeControl = CircularControl('voteup', 'plus_one', 'cyan')

// Shape for Text Nodes
const TextShape = (
  <symbol viewBox="0 0 100 100" id="text">
    <circle cx="50" cy="50" r="45"></circle>
  </symbol>
)

// Shape for a node with choices
const ChoiceShape = (
  <symbol viewBox="0 0 100 100" id="choice">
    <rect transform="translate(50) rotate(45)" width="70" height="70"></rect>
  </symbol>
)

// Shape for transitions
const TransitionShape = (
  <symbol viewBox="0 0 50 50" id="transition">
    <circle cx="25" cy="25" r="8" fill="currentColor"> </circle>
  </symbol>
)


// Exported configuration
export default {
  NodeTypes: {
    text: {
      typeText: "Text",
      shapeId: "#text",
      shape: TextShape
    },
    choice: {
      typeText: "Choice",
      shapeId: "#choice",
      shape: ChoiceShape
    }
  },
  NodeSubtypes: {},
  EdgeTypes: {
    transition: {
      shapeId: "#transition",
      shape: TransitionShape
    }
  },
  ControlTypes: {
    add: {
      shapeId: '#' + CircularControlClass.add,
      shape: AddNodeControl
    },
    voteup: {
      shapeId: '#' + CircularControlClass.voteup,
      shape: VoteUpNodeControl
    }
  }
}
