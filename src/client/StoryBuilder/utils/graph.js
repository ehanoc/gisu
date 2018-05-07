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

  getData() {
    return this.data
  }

  updateData(newData) {
    extend(this.data, newData)
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
 * Visit each graph node avoiding cycles
 */
class GraphVisitor {

  constructor(graph, root) {
    this.root = root
    this.graph = graph
    this.visited = {}
    this.nodesPerLevel = []
  }

  mark(node) {
    this.visited[node.id] = true
  }

  isMarked(node) {
    return has(this.visited, node.id)
  }

  visitNode(callback, node, parent=null, index=0, level=0) {
    this.nodesPerLevel[level] = this.nodesPerLevel[level] || []

    if (!this.isMarked(node)) {
      this.mark(node)

      this.nodesPerLevel[level].push(node)

      const stop = callback(node, parent, index, level) === false

      if (!stop) {
        this.graph.childrenOf(node)
          .forEach((child, i) =>
            this.visitNode(callback, child, node, i, level + 1)
          )
      }

    }
  }

  visit(callback, breadthFirst=false) {
    this.visited = {}
    this.nodesPerLevel = []
    this.visitNode(callback, this.root)
    return this
  }

}


/**
 * Graph Edge
 */
export class GraphEdge {

  constructor(source, target, data={}, type='transition') {
    this.index = null
    this.isNode = false
    this.isEdge = true

    this.sourceNode = source
    this.targetNode = target

    this.data = extend({is_accepted:false}, data)
    this.type = type
    this.deleted = false

    // These must be IDs due to GraphView API
    // should be changed in the future (or not)
    this.source = this.sourceNode.id
    this.target = this.targetNode.id
  }

  getSource() {
    return this.sourceNode
  }

  getData() {
    const source = this.sourceNode
    const target = this.targetNode

    let data
    if (source.data.choices) {
      const matchingChoices = source.data.choices.filter((c) => c.next_node_id == target.id)
      data = matchingChoices[0]
    }
    return data ? data : {}
  }

  updateData(newData) {
    const choice = this.getData()
    extend(choice, newData)
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
    source = this._node(source)
    target = this._node(target)

    source.addChild(targetId)
    target.setParent(sourceId)

    const edge = new GraphEdge(source, target, data)
    this.edges.push(edge)

    edge.index = this.edges.length - 1

    this._edgeMatrix[sourceId] = this._edgeMatrix[sourceId] || {}
    this._edgeMatrix[sourceId][targetId] = edge

    this._edgeMatrixInv[targetId] = this._edgeMatrixInv[choice.next_node_id] || {}
    this._edgeMatrixInv[targetId][sourceId] = edge


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
    const visitor = new GraphVisitor(this, root)
    return visitor.visit(callback)
  }

  init() {
    const visitor = this.visit((node, parent, index, level) => {
      if (parent) {
        node.data.is_accepted = node.data.is_accepted && parent.data.is_accepted

        this.getEdge(parent, node).data.is_accepted = node.data.is_accepted
      }
    })


    visitor.nodesPerLevel.forEach((level, levelIndex) => {
      const levelSize = level.length
      const levelWidth = levelSize * 300

      level.forEach((node, columnIndex) => {
        node.x = columnIndex * 300 - levelWidth/2
        node.y = levelIndex * 300
      })

    })

    return this
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
