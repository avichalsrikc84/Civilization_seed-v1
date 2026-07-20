class EventBus {

  constructor() {
    this.listeners = {}
  }

  // ==========================
  // Subscribe
  // ==========================

  on(event, callback) {

    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)

    return () => this.off(event, callback)
  }

  // ==========================
  // Unsubscribe
  // ==========================

  off(event, callback) {

    if (!this.listeners[event]) return

    this.listeners[event] =
      this.listeners[event].filter(
        listener => listener !== callback
      )

  }

  // ==========================
  // Emit Event
  // ==========================

  emit(event, payload = {}) {

    console.log(
      `⚡ ${event}`,
      payload
    )

    if (!this.listeners[event]) return

    this.listeners[event].forEach(listener => {

      try {

        listener(payload)

      }

      catch(error){

        console.error(error)

      }

    })

  }

  // ==========================
  // Clear
  // ==========================

  clear() {

    this.listeners = {}

  }

}

export default new EventBus()