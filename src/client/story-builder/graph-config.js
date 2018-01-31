/*
  Example config for GraphView component
*/
import React from 'react';

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

const transitionShape = (
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
      shape: transitionShape
    }
  }
}
