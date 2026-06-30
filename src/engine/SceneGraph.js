// ======================================================
// DIGITAL UNIVERSE SCENE GRAPH
// ======================================================
import * as THREE from 'three'
class SceneGraph {
  constructor() {
    this.nodes = new Map()
  }

  // ===========================================
  // Register object
  // ===========================================

  register({
    id,
    type,
    ref,
    data = {},
  }) {
    this.nodes.set(id, {
      id,
      type,
      ref,
      data,
    })
  }

  // ===========================================
  // Remove object
  // ===========================================

  unregister(id) {
    this.nodes.delete(id)
  }

  // ===========================================
  // Get one node
  // ===========================================

  get(id) {
    return this.nodes.get(id)
  }

  // ===========================================
  // Get every node
  // ===========================================

  getAll() {
    return [...this.nodes.values()]
  }

  // ===========================================
  // Filter by type
  // ===========================================

  getByType(type) {
    return [...this.nodes.values()].filter(
      (node) => node.type === type
    )
  }

  // ===========================================
  // World Position
  // ===========================================

  getWorldPosition(id) {
    const node = this.nodes.get(id)

    if (
      !node ||
      !node.ref ||
      !node.ref.current
    )
      return null

    return node.ref.current.getWorldPosition(
      new THREE.Vector3()
    )
  }

  // ===========================================
  // Debug
  // ===========================================

  print() {
    console.table(
      [...this.nodes.values()]
    )
  }
}

const sceneGraph = new SceneGraph()

export default sceneGraph