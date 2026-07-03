class EventBus {
  constructor() {
    this.listeners = new Map()
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }

    const callbacks =
      this.listeners.get(event)

    callbacks.push(callback)

    return () => {
      this.listeners.set(
        event,
        callbacks.filter(
          (cb) => cb !== callback
        )
      )
    }
  }

  publish(event, payload) {
    const callbacks =
      this.listeners.get(event)

    if (!callbacks) return

    callbacks.forEach((callback) =>
      callback(payload)
    )
  }

  clear() {
    this.listeners.clear()
  }
}

export const eventBus =
  new EventBus()