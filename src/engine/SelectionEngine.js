import sceneGraph from './SceneGraph'

class SelectionEngine {
  constructor() {
    this.selectedNode = null
    this.hoveredNode = null

    this.listeners = []
  }

  // =====================================
  // HOVER
  // =====================================

  hover(id) {
    this.hoveredNode = id

    this.notify()
  }

  clearHover() {
    this.hoveredNode = null

    this.notify()
  }

  // =====================================
  // SELECT
  // =====================================

  select(id) {
    this.selectedNode = id

    this.notify()
  }

  clearSelection() {
    this.selectedNode = null

    this.notify()
  }

  // =====================================
  // GETTERS
  // =====================================

  getHovered() {
    return this.hoveredNode
  }

  getSelected() {
    return this.selectedNode
  }

  getHoveredObject() {
    if (!this.hoveredNode) return null

    return sceneGraph.get(this.hoveredNode)
  }

  getSelectedObject() {
    if (!this.selectedNode) return null

    return sceneGraph.get(this.selectedNode)
  }

  // =====================================
  // EVENTS
  // =====================================

  subscribe(listener) {
    this.listeners.push(listener)

    return () => {
      this.listeners =
        this.listeners.filter(
          (l) => l !== listener
        )
    }
  }

  notify() {
    this.listeners.forEach(
      (listener) => listener()
    )
  }
}

const selectionEngine =
  new SelectionEngine()

export default selectionEngine