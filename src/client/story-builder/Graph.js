/*
  Example usage of GraphView component
*/
import {compact} from 'lodash'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import GraphView from 'react-digraph'
import GraphConfig from './graph-config.js' // Configures node/edge types

import {
  NodeInspector,
  HotkeysTooltip
} from './components'

import {Story} from '../api'

const styles = {
  graph: {
    height: '100%',
    width: '100%'
  }
};

const NODE_KEY = "id" // Key used to identify nodes

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

const buildEdge = (source, target, data=null, type=TRANSITION_TYPE) => ({
  isEdge: true,
  source, target, type, data
})

const buildGraph = (story) => {
  const nodeById = {}

  const graph = {
    nodes: [],
    edges : []
  }

  story.nodes.forEach((node) => {
    const graphNode = {
      id: node.id,
      title: `Node ${node.id}`,
      isNode: true,
      x: 0,
      y: 0,
      type: 'text',
      data: node,
      children: []
    }

    graph.nodes.push(graphNode)
    nodeById[graphNode.id] = graphNode

    if (node.choices != null) {
      const choiceEdges = compact(node.choices.map((choice) => {
        if (choice.next_node_id != null) {
          graphNode.children.push(choice.next_node_id)
          return buildEdge(node.id, choice.next_node_id, { text: choice.text })
        }
      }))
      graph.edges = graph.edges.concat(choiceEdges)
    } else if (node.next_node_id != null) {
      graph.edges.push(buildEdge(node.id, node.next_node_id))
      graphNode.children.push(node.next_node_id)
    }

  })


  function setPosition(node, x=0, y=0) {

    node.x = x
    node.y = y

    node.children.forEach((childId, i) => {
      const child = nodeById[childId]
      const childY = node.children.length <= 1 ? y : y+350*(i - node.children.length/2 + 1)
      setPosition(child, x+300, childY)
    })

  }

  setPosition(nodeById[story.start_node_id], window.outerWidth*0.15, window.outerHeight/2)




  return graph
}

export default class Graph extends Component {

  constructor(props) {
    super(props);

    this.state = {
      graph: EMPTY_GRAPH,
      selected: {}
    }

    Story.get(0)
      .then((story) => {
        const graph = buildGraph(story)
        console.log('Received', graph)
        this.setState({graph})
      })

  }

  // Helper to find the index of a given node
  getNodeIndex(searchNode) {
    return this.state.graph.nodes.findIndex((node)=>{
      return node[NODE_KEY] === searchNode[NODE_KEY]
    })
  }

  // Helper to find the index of a given edge
  getEdgeIndex(searchEdge) {
    return this.state.graph.edges.findIndex((edge)=>{
      return edge.source === searchEdge.source &&
        edge.target === searchEdge.target
    })
  }

  // Given a nodeKey, return the corresponding node
  getViewNode(nodeKey) {
    const searchNode = {};
    searchNode[NODE_KEY] = nodeKey;
    const i = this.getNodeIndex(searchNode);
    return this.state.graph.nodes[i]
  }

  /*
   * Handlers/Interaction
   */

  // Called by 'drag' handler, etc..
  // to sync updates from D3 with the graph
  onUpdateNode(viewNode) {
    const graph = this.state.graph;
    const i = this.getNodeIndex(viewNode);

    graph.nodes[i] = viewNode;
    this.setState({graph: graph});
  }

  // Node 'mouseUp' handler
  onSelectNode(viewNode) {
    // Deselect events will send Null viewNode
    if (!!viewNode){
      this.setState({selected: viewNode});
    } else{
      this.setState({selected: {}});
    }
  }

  // Edge 'mouseUp' handler
  onSelectEdge(viewEdge) {
    this.setState({selected: viewEdge});
  }

  // Updates the graph with a new node
  onCreateNode (x,y) {
    const graph = this.state.graph;

    // This is just an example - any sort of logic
    // could be used here to determine node type
    // There is also support for subtypes. (see 'sample' above)
    // The subtype geometry will underlay the 'type' geometry for a node
    const type = Math.random() < 0.25 ? CHOICE_TYPE : TEXT_TYPE;

    const viewNode = {
      id: this.state.graph.nodes.length + 1,
      title: '',
      type: type,
      x: x,
      y: y
    }

    graph.nodes.push(viewNode);
    this.setState({graph: graph});
  }

  // Deletes a node from the graph
  onDeleteNode(viewNode) {
    const graph = this.state.graph;
    const i = this.getNodeIndex(viewNode);
    graph.nodes.splice(i, 1);

    // Delete any connected edges
    const newEdges = graph.edges.filter((edge, i)=>{
      return  edge.source != viewNode[NODE_KEY] &&
              edge.target != viewNode[NODE_KEY]
    })

    graph.edges = newEdges;

    this.setState({graph: graph, selected: {}});
  }

  // Creates a new node between two edges
  onCreateEdge(sourceViewNode, targetViewNode) {
    const graph = this.state.graph;

    // This is just an example - any sort of logic
    // could be used here to determine edge type
    const type = sourceViewNode.type === CHOICE_TYPE ? SPECIAL_EDGE_TYPE : TRANSITION_TYPE;

    const viewEdge = {
      source: sourceViewNode[NODE_KEY],
      target: targetViewNode[NODE_KEY],
      type: type
    }

    // Only add the edge when the source node is not the same as the target
    if (viewEdge.source !== viewEdge.target) {
      graph.edges.push(viewEdge);
      this.setState({graph: graph});
    }
  }

  // Called when an edge is reattached to a different target.
  onSwapEdge(sourceViewNode, targetViewNode, viewEdge) {
    const graph = this.state.graph;
    const i = this.getEdgeIndex(viewEdge);
    const edge = JSON.parse(JSON.stringify(graph.edges[i]));

    edge.source = sourceViewNode[NODE_KEY];
    edge.target = targetViewNode[NODE_KEY];
    graph.edges[i] = edge;

    this.setState({graph: graph});
  }

  // Called when an edge is deleted
  onDeleteEdge(viewEdge) {
    const graph = this.state.graph;
    const i = this.getEdgeIndex(viewEdge);
    graph.edges.splice(i, 1);
    this.setState({graph: graph, selected: {}});
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

    console.log('Selected node is', selected)


    return (
      <div id='graph' style={styles.graph}>

        <HotkeysTooltip />

        <NodeInspector selectedNode={ selected.isNode || selected.isEdge ? selected : null }/>

        <GraphView  ref={(el) => this.GraphView = el}
                    nodeKey={NODE_KEY}
                    emptyType={TEXT_TYPE}
                    nodes={nodes}
                    edges={edges}
                    selected={selected}
                    nodeTypes={NodeTypes}
                    nodeSubtypes={NodeSubtypes}
                    edgeTypes={EdgeTypes}
                    getViewNode={this.getViewNode.bind(this)}
                    onSelectNode={this.onSelectNode.bind(this)}
                    onCreateNode={this.onCreateNode.bind(this)}
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
