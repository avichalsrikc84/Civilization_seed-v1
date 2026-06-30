import sceneGraph from './SceneGraph'
import { buildKnowledgeGraph } from '../graph'

class ConnectionEngine {
  constructor() {
    this.edges = []
  }

  // ======================================
  // Build graph from Digital DNA
  // ======================================

  build(digitalDNA) {
    const graph =
      buildKnowledgeGraph(digitalDNA)

    this.edges = graph.edges
  }

  // ======================================
  // Return graph edges
  // ======================================

  getEdges() {
    return this.edges
  }

  // ======================================
  // Resolve world positions
  // ======================================

  getRenderableEdges() {
    const renderEdges = []

    this.edges.forEach((edge) => {
      const from =
        sceneGraph.get(edge.from)

      const to =
        sceneGraph.get(edge.to)

      if (
        !from ||
        !to ||
        !from.ref?.current ||
        !to.ref?.current
      )
        return

      renderEdges.push({
        from,
        to,
        type: edge.type,
      })
    })

    return renderEdges
  }
}

const connectionEngine =
  new ConnectionEngine()

export default connectionEngine