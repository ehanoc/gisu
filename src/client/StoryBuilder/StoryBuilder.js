import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import GraphView from './components/GraphView'
import GraphConfig from './graph-definitions' // Configures node/edge types
import GraphBuilder from './utils/graph-builder'
import classes from './StoryBuilder.scss'
import {
  Panel,
  HotkeysTooltip
} from './components'
import {Story, Node} from '../api'
import {compact, random, has, keys} from 'lodash'

// Obtain random IDs for new nodes
const randomId = () => random(100, 99999)

// Acception threshold defines how many votes a node needs
// to be accepted.
const ACCEPTION_THRESHOLD = 1


/**
 *
 * Story Builder
 *
 * Application to build stories.
 *
 */


export default class StoryBuilder extends Component {

  constructor(props) {
    super(props);

    const EMPTY_GRAPH = {
      "nodes": [],
      "edges": []
    }

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

  /**
   * Returns current graph instance
   */
  graph() {
    return this.state.graph
  }

  /**
   * Performs selection of a given element
   */
  selectElement(element={}) {
    this.setState({selected: element})
    this.graphView.centerOn(element);
  }

  /**
   * Returns current node
   */
  currentNode() {
    return this.state.selected
  }

  /**
   * Performs selection of a previous node in the graph
   */
  previousNode() {
    const previousNode = this.graph().getParent(this.currentNode())
    if (previousNode) {
      this.selectElement(previousNode)
    } else {
      console.error('No previous node')
    }
  }

  /**
   * Performs selection of a next node in the graph
   */
  nextNode(i=0) {
    const currentNode = this.currentNode()
    if (currentNode.hasChildren()) {
      const children = this.graph().childrenOf(currentNode)
      this.selectElement(children[0])
    } else {
      console.error('No next node')
    }
  }

  /**
   * Updates data related to a story node.
   */
  updateStoryNode(data) {
    Node.update(data.id, data)
    var node = this.graph().getNode(data.id)
    node.updateData(data)
    this.calculateAcception(node)
    this.forceUpdate()
  }

  /**
   * Performs acception calculation over a given node
   */
  calculateAcception(node) {
      this.graph().accept(node,  ACCEPTION_THRESHOLD)
  }

  /**
   * Set Graph View element
   */
  setGraphView(element) {
    this.graphView = element
  }

  /**
   * Get node by id
   */
  getViewNode(nodeId) {
    return this.graph().getNode(nodeId)
  }



  //----------- Handlers/Interaction


  /**
   * Updates a node state in the graph
   */
  onUpdateNode(node) {
    const graph = this.graph()
    graph.updateNode(node)
    this.setState({graph});
  }

  /**
   * Handles node selection
   */
  onSelectNode(node) {
    if (node) {
      this.selectElement(node)
    }
  }

  /**
   * Handles edge selection
   */
  onSelectEdge(edge) {
    this.selectElement(edge);
  }

  /**
   * Handles voteup
   */
  onVoteUpNode(node) {
    node.data.votes += 1
    this.calculateAcception(node)
  }

  /**
   * Add new child node for a given parent
   */
  onAddNode (parent) {
    const graph = this.graph()

    // Create new node
    const id = randomId()
    graph.addNode({
      id,
      data: {
        "title": `Node ${id}`,
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


    // Calculate position
    const insertAbove = parent.children.length % 2 != 0

    const xRange = parent.children.reduce((range, c) =>
    [Math.min(range[0], graph.getNode(c).x), Math.max(range[1], graph.getNode(c).x)]
    , [parent.x, parent.x])

    node.y = parent.y + 300,
    node.x = parent.children.length == 0
      ? parent.x
      : insertAbove
          ? xRange[0] - 175
          : xRange[1] + 175

    // Update graph
    this.setState({graph})
    console.log('Added new node')
  }

  /**
   * Delete node from the graph
   */
  onDeleteNode(viewNode) {
    this.setState({
      graph: this.graph(),
      selected: {}
    })
  }

  /**
   * Create a new edge between two nodes
   */
  onCreateEdge(sourceNode, targetNode) {
    // Only add the edge when the source node is not the same as the target
    if (sourceNode !== targetNode) {
      this.setState({
        graph: this.graph().addEdge(sourceNode, targetNode)
      })
    }
  }

  /**
   * Handles edges being re-attached to another target
   */
  onSwapEdge(source, target, edge) {
    const graph = this.graph()
    graph.swapEdge(edge)
    this.setState({graph});
  }

  /**
   * Handles edge deletion
   */
  onDeleteEdge(edge) {
    this.setState({
      graph: this.graph().removeEdge(edge),
      selected: {}
    });
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
      <div id='graph' style={{ graph: { height: '100%', width: '100%' } }}>


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
                    nodeKey="id"
                    emptyType="text"
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
