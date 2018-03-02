/*
  Example usage of GraphView component
*/
import {compact, random, has, keys} from 'lodash'

const randomId = () => random(100, 99999)

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import GraphView from './components/GraphView'
import GraphConfig from './graph-config.js' // Configures node/edge types

import GraphBuilder from './utils/graph-builder'

import classes from './StoryBuilder.scss'

import {
  Panel,
  HotkeysTooltip
} from './components'

import {Story, Node} from '../api'

const styles = {
  graph: {
    height: '100%',
    width: '100%'
  }
};

const NODE_KEY = "id" // Key used to identify nodes

const ACCEPTION_THRESHOLD = 1

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
const TEXT_TYPE = "text"; // Empty node type
const CHOICE_TYPE = "choice";
const SPECIAL_CHILD_SUBTYPE = "specialChild";
const TRANSITION_TYPE = "transition";
const SPECIAL_EDGE_TYPE = "specialEdge";

// NOTE: Edges must have 'source' & 'target' attributes
// In a more realistic use case, the graph would probably originate
// elsewhere in the App or be generated from some other state upstream of this component.
const EMPTY_GRAPH = {
  "nodes": [],
  "edges": []
}





export default class StoryBuilder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      graph: EMPTY_GRAPH,
      selected: {}
    }

    Story.get(0)
      .then((story) => {
        const graph = (new GraphBuilder()).build(story)
        console.log('Received', graph)
        this.setState({graph, selected : graph.nodes[0] })
      })

  }

  graph() {
    return this.state.graph
  }


  selectElement(element={}) {
    this.setState({selected: element})
    this.graphView.centerOn(element);
  }

  currentNode() {
    return this.state.selected
  }

  previousNode() {
    const previousNode = this.graph().getParent(this.currentNode())
    if (previousNode) {
      this.selectElement(previousNode)
    } else {
      console.error('No previous node')
    }
  }

  nextNode(i=0) {
    const currentNode = this.currentNode()
    if (currentNode.hasChildren()) {
      const children = this.graph().childrenOf(currentNode)
      this.selectElement(children[0])
    } else {
      console.error('No next node')
    }
  }

  updateStoryNode(data) {
    Node.update(data.id, data)
    var node = this.graph().getNode(data.id)
    node.updateData(data)
    this.calculateAcception(node)
    this.forceUpdate()
  }

  calculateAcception(node) {
      this.graph().accept(node,  ACCEPTION_THRESHOLD)
  }

  /*
   * Handlers/Interaction
   */

  // Called by 'drag' handler, etc..
  // to sync updates from D3 with the graph
  onUpdateNode(node) {
    const graph = this.graph()
    graph.updateNode(node)
    this.setState({graph});
  }

  // Node 'mouseUp' handler
  onSelectNode(node) {
    // Deselect events will send Null viewNode
    if (node) {
      this.selectElement(node)
    }
  }

  // Edge 'mouseUp' handler
  onSelectEdge(edge) {
    this.selectElement(edge);
  }

  onVoteUpNode(node) {
    node.data.votes += 1
    this.calculateAcception(node)
  }

  // Updates the graph with a new node
  onAddNode (parent) {
    const graph = this.graph()

    const id = randomId()
    graph.addNode({
      id,
      title: `Node ${id}`,
      data: {
        "id" : id,
        "story_id": parent.data.story_id,
        "votes": 0,
        "is_accepted": false,
        "background_id": 0,
        "music_id": null,
        "text": ""
      }
    }, parent)

    const node = graph.getNode(id)

    const insertAbove = parent.children.length % 2 != 0

    const xRange = parent.children.reduce((range, c) =>
    [Math.min(range[0], nodeById[c].x), Math.max(range[1], nodeById[c].x)]
    , [parent.x, parent.x])

    node.y = parent.y + 300,
    node.x = parent.children.length == 0
      ? parent.x
      : insertAbove
          ? xRange[0] - 175
          : xRange[1] + 175

    this.setState({graph})
    console.log('Added new node')
  }

  // Deletes a node from the graph
  onDeleteNode(viewNode) {
    this.setState({
      graph: this.graph(),
      selected: {}
    })
  }

  // Creates a new node between two edges
  onCreateEdge(sourceNode, targetNode) {
    // Only add the edge when the source node is not the same as the target
    if (sourceNode !== targetNode) {
      this.setState({
        graph: this.graph().addEdge(sourceNode, targetNode)
      })
    }
  }

  // Called when an edge is reattached to a different target.
  onSwapEdge(source, target, edge) {
    const graph = this.graph()
    graph.swapEdge(edge)
    this.setState({graph});
  }

  // Called when an edge is deleted
  onDeleteEdge(edge) {
    this.setState({
      graph: this.graph().removeEdge(edge),
      selected: {}
    });
  }

  setGraphView(element) {
    this.graphView = element
  }

  getViewNode(nodeId) {
    return this.graph().getNode(nodeId)
  }

  /*
   * Render
   */

  render() {
    const nodes = this.state.graph.nodes
    const edges = this.state.graph.edges
    const selected = this.state.selected

    const NodeTypes = GraphConfig.NodeTypes
    const NodeSubtypes = GraphConfig.NodeSubtypes
    const EdgeTypes = GraphConfig.EdgeTypes
    const ControlTypes = GraphConfig.ControlTypes

    console.log('Selected node is', selected)


    return (
      <div id='graph' style={styles.graph}>


        <Panel
          className={classes.Panel}
          selectedNode={ selected.isNode || selected.isEdge ? selected : {} }
          onUpdateNode={(data) => this.updateStoryNode(data)}
          onPreviousNode={() => this.previousNode()}
          onNextNode={() => this.nextNode()}
        />

        <GraphView  ref={this.setGraphView.bind(this)}
                    className={classes.GraphView}
                    graphControls={false}
                    nodeKey={NODE_KEY}
                    emptyType={TEXT_TYPE}
                    nodes={nodes}
                    edges={edges}
                    selected={selected}
                    nodeTypes={NodeTypes}
                    nodeSubtypes={NodeSubtypes}
                    edgeTypes={EdgeTypes}
                    controlTypes={ControlTypes}
                    getViewNode={this.getViewNode.bind(this)}
                    onSelectNode={this.onSelectNode.bind(this)}
                    onAddNode={this.onAddNode.bind(this)}
                    onVoteUpNode={this.onVoteUpNode.bind(this)}
                    onUpdateNode={this.onUpdateNode.bind(this)}
                    onDeleteNode={this.onDeleteNode.bind(this)}
                    onSelectEdge={this.onSelectEdge.bind(this)}
                    onCreateEdge={this.onCreateEdge.bind(this)}
                    onSwapEdge={this.onSwapEdge.bind(this)}
                    onDeleteEdge={this.onDeleteEdge.bind(this)}/>
      </div>
    );
  }

}
