import Graph from './graph'

export default class GraphBuilder {


  buildNode(storyNode) {
    return {
      id: storyNode.id,
      title: `Node ${storyNode.id}`,
      data: storyNode || {},
    }
  }

  buildGraph(story) {
    const graph = new Graph()

    story.nodes.forEach((storyNode) => {
      const graphNode = this.buildNode(storyNode)
      graph.addNode(graphNode)

      if (storyNode.choices != null) {
        storyNode.choices.forEach((choice) => {
          if (choice.next_node_id != null) {
            graph.addEdge(graphNode.id, choice.next_node_id, { text: choice.text, is_accepted: false })
          }
        })
      } else if (storyNode.next_node_id != null) {
        graph.addEdge(graphNode.id, storyNode.next_node_id, { is_accepted: false })
      }

    })

    graph.init()

    console.log(graph)

    return graph
  }

  build(story) {
    return this.buildGraph(story)
  }


}
