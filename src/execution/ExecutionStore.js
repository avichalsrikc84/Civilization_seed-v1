class ExecutionStore {

  constructor() {

    this.reset()

    this.listeners = new Set()

  }

  // =====================================
  // Subscribe
  // =====================================

  subscribe(listener) {

    this.listeners.add(listener)

    return () => {

      this.listeners.delete(listener)

    }

  }

  notify() {

    this.listeners.forEach(listener =>

      listener(this.getState())

    )

  }

  // =====================================
  // Reset
  // =====================================

  reset() {

    this.state = {

      running: false,

      startedAt: null,

      finishedAt: null,

      executionTime: 0,

      currentAgent: null,

      currentTool: null,

      progress: 0,

      status: "idle",

      timeline: [],

      errors: [],

      metadata: {}

    }

  }

  // =====================================
  // State
  // =====================================

  getState() {

    return structuredClone(this.state)

  }

  // =====================================
  // Generic Update
  // =====================================

  update(updates) {

    this.state = {

      ...this.state,

      ...updates

    }

    this.notify()

  }

  // =====================================
  // Timeline
  // =====================================

  addEvent(event, payload = {}) {

    this.state.timeline.push({

      id: crypto.randomUUID(),

      event,

      payload,

      timestamp: new Date()

    })

    this.notify()

  }

  // =====================================
  // Progress
  // =====================================

  setProgress(progress) {

    this.state.progress = progress

    this.notify()

  }

  // =====================================
  // Tool
  // =====================================

  setCurrentTool(tool) {

    this.state.currentTool = tool

    this.notify()

  }

  // =====================================
  // Agent
  // =====================================

  setCurrentAgent(agent) {

    this.state.currentAgent = agent

    this.notify()

  }

  // =====================================
  // Error
  // =====================================

  addError(error) {

    this.state.errors.push({

      message: error.message,

      time: new Date()

    })

    this.notify()

  }

  // =====================================
  // Start
  // =====================================

  start(agent) {

    this.reset()

    this.state.running = true

    this.state.status = "running"

    this.state.startedAt = new Date()

    this.state.currentAgent = agent

    this.notify()

  }

  // =====================================
  // Finish
  // =====================================

  finish() {

    this.state.running = false

    this.state.status = "completed"

    this.state.finishedAt = new Date()

    this.state.executionTime =

      this.state.finishedAt -

      this.state.startedAt

    this.state.progress = 100

    this.notify()

  }

}

export default new ExecutionStore()