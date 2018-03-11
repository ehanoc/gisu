import {extend, has, values, isObject} from 'lodash'


/**
 * Helper classes to modelate a Graph
 * Each class support operations over the
 * graph and it's elements.
 */


/**
 * Graph Node
 */
export class GraphNode {

  constructor(attributes) {
    this.index = null
    this.isNode = true
    this.isEdge = false
    this.x = 0
    this.y = 0
    this.type = 'text'
    this.data = {}
    this.children = []
    this.parent = null
    this.deleted = false
    extend(this, attributes)
  }

  hasChildren() {
    return this.children.length > 0
  }

  setParent(id) {
    this.parent = id
    return this
  }

  removeParent() {
    return this.setParent(null)
  }

  addChild(childId) {
    this.children.push(childId)
    return this
  }

  removeChild(childId) {
    this.children.splice(this.children.indexof(childId), 1)
    return this
  }

  isAccepted() {
    return this.data.is_accepted == true
  }

  accept(value=true) {
    this.data.is_accepted = value
    return this
  }

  updateData(data) {
    extend(this.data, data)
  }

  markAsDeleted(value=true) {
    this.deleted = value
  }

}


/**
 * Graph Edge
 */
export class GraphEdge {

  constructor(sourceId, targetId, data={}, type='transition') {
    this.index = null
    this.isNode = false
    this.isEdge = true
    this.source = sourceId
    this.target = targetId
    this.data = extend({is_accepted:false}, data)
    this.type = type
    this.deleted = false
  }

  markAsDeleted(value=true) {
    this.deleted = value
  }

  accept(value=true) {
    this.data.is_accepted = value
    return this
  }

  swap() {
    const oldSource = this.source
    this.source = this.target
    this.target = oldSource
    return this
  }
}


/**
 * Graph
 */
export default class Graph {

  constructor() {
    this.x = 0
    this.y = 0

    this.nodes = []
    this.edges = []

    this._nodeById = {}
    this._edgeMatrix = {}
    this._edgeMatrixInv = {}
  }

  getNode(id) {
    return this._nodeById[id]
  }

  childrenOf(node) {
    return node.children.map((childId, i) =>
      this.getNode(childId)
    )
  }

  accept(node, acceptation_threshold) {
    if (!this.getParent(node) || this.getParent(node).isAccepted()) {
      this.visit((node, parent, index) => {
        node.accept(node.data.votes >= acceptation_threshold)
        if (parent) {
          this.getEdge(parent, node).accept(node.isAccepted())
        }
        return node.isAccepted()
      }, this._node(node))

      if (this.getParent(node)) {
        this.getEdge(this.getParent(node), node).accept(node.isAccepted())
      }
    }
    return this
  }

  getEdge(source, target) {
    return this._edgeMatrix[this._id(source)][this._id(target)]
  }

  getEdgesTo(node) {
    return values(this._edgeMatrixInv[this._id(node)])
  }

  getEdgesFrom(node) {
    return values(this._edgeMatrix[this._id(node)])
  }

  hasParent(id) {
    return this.getParent(id) != null
  }

  getParent(node) {
    const edgesTo = this.getEdgesTo(this._id(node))
    if (edgesTo.length > 0) {
      const parentId = edgesTo[0].source
      return this.getNode(parentId)
    } else {
      return null
    }
  }

  addEdge(source, target, data={}) {
    const sourceId = this._id(source)
    const targetId = this._id(target)

    const edge = new GraphEdge(sourceId, targetId, data)
    this.edges.push(edge)

    edge.index = this.edges.length - 1

    this._edgeMatrix[sourceId] = this._edgeMatrix[sourceId] || {}
    this._edgeMatrix[sourceId][targetId] = edge

    this._edgeMatrixInv[targetId] = this._edgeMatrixInv[choice.next_node_id] || {}
    this._edgeMatrixInv[targetId][sourceId] = edge

    this.getNode(sourceId).addChild(targetId)

    return this
  }

  removeEdge(edge, { processMark=true }) {

    const source = this._node(edge.source)
    const target = this._node(edge.target)

    source.removeChild(target.id)
    target.removeParent()

    edge.markAsDeleted()

    delete this._edgeMatrix[edge.source][edge.target]
    delete this._edgeMatrixInv[edge.target][edge.source]

    if (processMark) {
      this._processMarks('edge')
    }

    return this
  }

  addNode(node, parent=false) {
    node = new GraphNode(node)
    this.nodes.push(node)
    this._nodeById[node.id] = node
    node.index = this.nodes.length - 1

    if (parent) {
      node.setParent(this._id(parent))
      this.addEdge(parent, node, { is_accepted: parent.isAccepted() && node.isAccepted() })
    }

    return this
  }

  updateNode(node) {
    this.nodes[node.index] = node
    return this
  }

  _processMarks(target='all') {
    if (target == 'all' || target == 'node') {
      this.nodes = this.nodes.filter((node) => !node.deleted)
      this._updateNodeIndexes()
    }

    if (target == 'all' || target == 'edge') {
      this.edges = this.edges.filter((edge) => !node.deleted)
      this._updateEdgeIndexes()
    }

    return this
  }

  removeNode(node, { processMark=true }) {
    this.getEdgesTo(node)
      .concat(this.getEdgesFrom(node))
      .forEach((edge) => {
        this.removeEdge(edge, { processMark: false })
      })

    node.markAsDeleted()

    if (processMark) {
      this._processMarks()
    }

    return this
  }

  swapEdge(edge) {
    this.removeEdge(edge)
    this.addEdge(edge.swap())
  }

  root() {
    return this.nodes[0]
  }

  visit(callback, root) {
    root = root || this.root()
    const visited = {}

    const _markVisited = (node) =>
      visited[this._id(node)] = true

    const _visited = (node) =>
      has(visited, this._id(node))

    function _visit(graph, f, node, parent=null, index=0) {

      if (!_visited(node)) {
        _markVisited()

        const stop = f(node, parent, index) === false

        if (!stop) {
          graph.childrenOf(node).forEach((child, i) =>
            _visit(graph, f, child, node, i) )
        }

      }

    }

    return _visit(this, callback, root)
  }

  init() {
    this.visit((node, parent, index) => {
      if (parent) {
        node.data.is_accepted = node.data.is_accepted && parent.data.is_accepted

        this.getEdge(parent, node).data.is_accepted = node.data.is_accepted

        node.x = parent.children.length <= 1 || index == 0
          ? parent.x
          : parent.x + 800 * (index - parent.children.length/2)
        node.y = parent.y + 300

        console.log(parent)
        console.log(index, parent.children.length, node.x, node.y)
      }
    })

    this._updateRelationships()
    return this
  }

  _updateRelationships() {
    this.nodes.forEach((node) => {
      const parent = this.getParent(node)
      if (parent != null) {
        node.setParent(parent.id)
      } else {
        console.log(node, 'has no parent', parent)
      }
    })
  }

  _updateEdgeIndexes() {
    this.edges.forEach((edge, index) => {
      edge.index = index
    })
    return this
  }

  _updateNodeIndexes() {
    this.nodes.forEach((node, index) => {
      node.index = index
    })
    return this
  }

  _id(nodeOrId) {
    return isObject(nodeOrId) ? nodeOrId.id : nodeOrId
  }

  _node(nodeOrId) {
    return isObject(nodeOrId) ? nodeOrId : this.getNode(nodeOrId)
  }

}
