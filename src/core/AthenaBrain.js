class AthenaBrain {
  constructor() {
    this.memory = {}
  }

  remember(agent, data) {
    this.memory[agent] = data
  }

  recall(agent) {
    return this.memory[agent]
  }

  recallAll() {
    return this.memory
  }

  has(agent) {
    return !!this.memory[agent]
  }

  forget(agent) {
    delete this.memory[agent]
  }

  clear() {
    this.memory = {}
  }
}

export const athenaBrain =
  new AthenaBrain()