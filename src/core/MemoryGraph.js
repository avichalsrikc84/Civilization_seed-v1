class MemoryGraph {
  constructor() {
    this.graph = new Map()
  }

  add(source, value) {
    if (!this.graph.has(value)) {
      this.graph.set(
        value,
        new Set()
      )
    }

    this.graph
      .get(value)
      .add(source)
  }

  get(value) {
    return this.graph.get(value)
  }

  has(value) {
    return this.graph.has(value)
  }

  export() {
    const result = {}

    this.graph.forEach(
      (sources, key) => {
        result[key] = [
          ...sources,
        ]
      }
    )

    return result
  }

  clear() {
    this.graph.clear()
  }
}

export const memoryGraph =
  new MemoryGraph()