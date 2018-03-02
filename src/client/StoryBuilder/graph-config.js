/*
  Example config for GraphView component
*/
import React from 'react'

import classes from './StoryBuilder.scss'


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

const AddNodeControl = CircularControl('add', 'share', 'pink')

const VoteUpNodeControl = CircularControl('voteup', 'plus_one', 'cyan')


const TextShape = (
  <symbol viewBox="0 0 100 100" id="text">
    <circle cx="50" cy="50" r="45"></circle>
  </symbol>
)

const ChoiceShape = (
  <symbol viewBox="0 0 100 100" id="choice">
    <rect transform="translate(50) rotate(45)" width="70" height="70"></rect>
  </symbol>
)

/*
const SpecialChildShape = (
  <symbol viewBox="0 0 100 100" id="specialChild">
    <rect x="2.5" y="0" width="95" height="97.5" fill="rgba(30, 144, 255, 0.12)"></rect>
  </symbol>
)
*/

const TransitionShape = (
  <symbol viewBox="0 0 50 50" id="transition">
    <circle cx="25" cy="25" r="8" fill="currentColor"> </circle>
  </symbol>
)

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
  NodeSubtypes: {
    /*
    specialChild: {
      shapeId: "#specialChild",
      shape: SpecialChildShape
    }
    */
  },
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
